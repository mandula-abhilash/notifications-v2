# Real-Time Notification System

A scalable real-time notification system built with Next.js, Express, Socket.IO, Redis, and RabbitMQ.

## Project Structure

```
.
├── frontend/                 # Next.js frontend application
├── backend/                 # Express backend application
├── nginx.conf              # NGINX configuration for load balancing
├── ecosystem.config.js     # PM2 configuration
└── .env.example           # Example environment variables
```

## Prerequisites

- Node.js 18+
- MongoDB
- Redis
- RabbitMQ
- NGINX
- PM2

## Installation

1. Clone the repository
2. Copy .env.example to .env and update the values
3. Install dependencies:

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

## Development

```bash
# Start frontend development server
cd frontend
npm run dev

# Start backend development server
cd backend
npm run dev
```

## Production Deployment

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Configure NGINX:
```bash
sudo cp nginx.conf /etc/nginx/nginx.conf
sudo nginx -t
sudo systemctl restart nginx
```

3. Start the backend instances with PM2:
```bash
pm2 start ecosystem.config.js
```

## Features

- JWT Authentication
- Real-time notifications
- Email verification with AWS SES
- Load balanced with NGINX
- Scalable with PM2 cluster mode
- Redis for session management
- RabbitMQ for message queuing