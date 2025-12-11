# AutoBlog - Full-Stack AI Blog Platform

A Dockerized, full-stack blog application with auto-generated content using AI. Built for the Assimetria technical challenge.

## 🚀 Features
- **Frontend**: React (Vite) with modern "Glassmorphism" dark UI.
- **Backend**: Node.js (Express) API with PostgreSQL integration.
- **AI Integration**: HuggingFace Inference API for generating tech articles.
- **Automation**: Daily Cron Job generating fresh content automatically.
- **Infrastructure**: Ready for AWS EC2 Deployment (Docker Compose + CodeBuild).

## 🛠️ Tech Stack
- **Frontend**: React, Axios, CSS Modules.
- **Backend**: Node.js, Express, Prisma (PostgreSQL).
- **DevOps**: Docker, Docker Compose, AWS ECR/CodeBuild configs.

## 📦 Getting Started Locally

### Prerequisites
- Docker & Docker Compose
- Node.js (v18+)

### 1. Clone & Setup
```bash
git clone <your-repo-url>
cd AutoBlog
```

### 2. Run with Docker Compose (Recommended)
This will spin up the Database, Backend, and Frontend.
```bash
docker-compose up -d --build
```
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:3001](http://localhost:3001)

### 3. Manual Run (Without Docker)
**Backend:**
```bash
cd backend
npm install
# Ensure you have a local Postgres running or use the docker db
npx prisma generate
npx prisma db push
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## 🤖 AI Configuration
The app uses the HuggingFace Inference API.
- **Key**: Set `HF_TOKEN` in `backend/.env`.
- **Fallback**: If the API is unavailable or rate-limited (400/503), the system automatically generates a Mock Article to ensure functionality.
- **Model**: Uses `microsoft/Phi-3-mini-4k-instruct` (via HuggingFace) for reliable free-tier inference.

## ☁️ Deployment (AWS)
This repository includes infrastructure as code for AWS:
- **`infra/buildspec.yml`**: For AWS CodeBuild pipeline.
- **`infra/docker-compose.prod.yml`**: Production compose file for EC2.
- **`infra/scripts/init-ec2.sh`**: Helper script for instance initialization.

## 📝 License
MIT
