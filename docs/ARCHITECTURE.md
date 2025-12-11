# System Architecture

## Overview
AutoBlog is a containerized microservices application deployed on AWS EC2. It consists of a frontend React application, a backend Node.js API, and a PostgreSQL database.

## Components

### 1. Frontend (`/frontend`)
- **Technology**: React (Vite)
- **Role**: Serves the user interface.
- **Serving**: Uses Nginx as a web server and reverse proxy.
- **Communication**: Sends HTTP requests to the Backend API via Nginx proxy (`/api` -> `backend:3001`).

### 2. Backend (`/backend`)
- **Technology**: Node.js (Express)
- **Role**: Core business logic, API endpoints, and AI orchestration.
- **Database Access**: Uses Prisma ORM to communicate with PostgreSQL.
- **AI Service**: integrated with HuggingFace Inference API for generating article content.
- **Scheduler**: Runs a daily Cron job to generate fresh content automatically.

### 3. Database (`postgres`)
- **Technology**: PostgreSQL 13 (Docker Image)
- **Role**: Persistent storage for articles and users.
- **Volume**: Data is persisted using Docker Volumes.

## Data Flow

1. **User Request**: User visits the website (port 80).
2. **Nginx Routing**: Nginx serves static files. API requests (`/api/*`) are proxied to the Backend container.
3. **API Processing**: Backend processes the request.
4. **Database Query**: Backend queries PostgreSQL via Prisma.
5. **AI Generation** (If applicable): Backend calls external HuggingFace API.
6. **Response**: Data is returned to the Frontend and rendered.

## Infrastructure Diagram

```mermaid
graph TD
    Client[Browser] -->|HTTP:80| Frontend[Frontend (Nginx)]
    Frontend -->|Proxy /api| Backend[Backend (Node.js)]
    Backend -->|SQL| DB[(PostgreSQL)]
    Backend -->|HTTPS| HF[HuggingFace API]
    Backend -->|Cron| AutoGen[Daily Job]
```
