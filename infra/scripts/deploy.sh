#!/bin/bash
# Suggested deploy.sh from README structure
# This script would traditionally run on the EC2 instance or via CodeDeploy

echo "Deploying AutoBlog..."

# Navigate to app directory (assumed)
cd /home/ec2-user/app

# Pull latest images
docker-compose pull

# Restart services
docker-compose up -d

echo "Deployment complete!"
