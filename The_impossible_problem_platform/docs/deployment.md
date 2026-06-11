# Deployment Guide

## Docker Compose

1. Copy `.env.example` to `.env`.
2. Build and run:
   ```bash
   docker compose up --build
   ```
3. Confirm services:
   - Backend: `http://localhost:8000`
   - Frontend: `http://localhost:3000`
   - Neo4j: `http://localhost:7474`
   - RabbitMQ: `http://localhost:15672`

## Kubernetes

Deploy the backend and infrastructure using the manifest files in `backend/kubernetes`.

### Key services

- PostgreSQL
- Neo4j
- Qdrant
- Redis
- RabbitMQ
- Backend API
- Frontend UI

### Notes

- Configure secrets in Kubernetes `Secret` objects before applying workloads.
- Use persistent volumes for databases and graph storage.
- Use a managed load balancer in cloud environments.
