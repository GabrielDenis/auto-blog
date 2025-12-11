# 🚀 Master Deployment Guide (Ubuntu EC2)

This guide takes you from "Code on Laptop" to "Live Website" in 4 distinct phases.

**Follow these steps exactly in order.**

---

## 🖥️ Phase 1: Local Setup (VS Code Terminal)
*Where: On your own computer inside VS Code.*

1.  **Open Terminal**: `Ctrl + ~` (Windows) or `Cmd + ~` (Mac).
2.  **Push your latest code**:
    ```bash
    git add .
    git commit -m "Final deployment check"
    git push origin main
    ```
3.  **Wait**: Go to the **AWS CodeBuild Console** and make sure the latest build says **Succeeded**.

---

## ☁️ Phase 2: AWS Console (Browser)
*Where: In your Web Browser (Chrome/Edge).*

### 1. Create Repositories (If not done)
1.  Go to **Amazon ECR**.
2.  Create two repositories:
    *   `autoblog-backend`
    *   `autoblog-frontend`
3.  **Copy your Account ID**: It's the 12-digit number in the top right corner (e.g., `123456789012`).

### 2. Launch Server (If not done)
1.  Go to **EC2 Dashboard** > **Launch Instance**.
2.  **Name**: `AutoBlog-Prod`.
3.  **OS**: **Ubuntu** (Ubuntu Server 24.04 LTS).
4.  **Instance Type**: `t2.micro` (Free Tier).
5.  **Key Pair**: Create new (e.g., `autoblog-key`) and download it.
6.  **Network Settings**: Allow traffic from anywhere (0.0.0.0/0) for:
    *   SSH (Port 22)
    *   HTTP (Port 80)
    *   Custom TCP (Port 3001) - *Click `Add security group rule`*.
7.  **Launch Instance**.

---

## 📡 Phase 3: Connect to Server
*Where: In your Web Browser.*

1.  Go to **EC2 Dashboard** > **Instances**.
2.  Click on your running instance (`AutoBlog-Prod`).
3.  Click the **Connect** button (top right).
4.  Select the **EC2 Instance Connect** tab.
5.  Click **Connect** (orange button).
    *   *Result: A new browser tab opens with a black terminal screen. This is your server.*

---

## 📟 Phase 4: Server Setup (EC2 Terminal)
*Where: **ONLY** in the black browser terminal you just opened (Remote Server).*

**Copy and Run these blocks ONE BY ONE.**

### Step A: Install Docker & Tools (Ubuntu Version)
```bash
sudo apt-get update -y
sudo apt-get install -y docker.io unzip
# Install AWS CLI
sudo snap install aws-cli --classic
# Setup Docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
# Reload systemd (in case of warnings) and apply permissions
sudo systemctl daemon-reload
sudo newgrp docker
```

### Step B: Log in to AWS ECR
*You must replace the values below!*
```bash
# REPLACE 'us-east-1' with your region (check top right of AWS console)
export AWS_REGION=us-east-1
# REPLACE with YOUR 12-digit Account ID
export AWS_ACCOUNT_ID=YOUR_ACCOUNT_ID_HERE 

aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com
```
*Expected Output: `Login Succeeded`*

### Step C: Set Your App Secrets
*Copy this block, edit the values in a notepad if needed, then paste.*
```bash
export POSTGRES_USER=postgres
export POSTGRES_PASSWORD=mysecurepassword
export POSTGRES_DB=autoblog
export JWT_SECRET=supersecretproductionkey
# YOUR ECR REGISTRY URI (Account ID + Region)
export ECR_REGISTRY=$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com
export IMAGE_REPO_NAME=autoblog
# API KEYS (Optional for now if using mocks)
export HF_TOKEN=placeholder
export OPENROUTER_API_KEY=placeholder
```

### Step D: Download & Launch
*Replace `YOUR_GITHUB_USER` with your actual username.*
```bash
# Download the file
wget https://raw.githubusercontent.com/YOUR_GITHUB_USER/AutoBlog/main/infra/docker-compose.prod.yml -O docker-compose.yml

# Start the App
docker-compose up -d
```

### Step E: See it Live!
1.  Go back to the **EC2 Console** in your browser.
2.  Find the **Public IPv4 address** of your instance.
3.  Open a new tab and go to: `http://<YOUR_PUBLIC_IP>`

🎉 **You are LIVE!**
