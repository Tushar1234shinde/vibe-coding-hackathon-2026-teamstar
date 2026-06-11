# The Impossible Problem Platform

Solving Humanity's Hardest Problems Through Collective Intelligence.

## Overview

The Impossible Problem Platform is a global operating system for tackling complex challenges by combining AI, human collaboration, knowledge graphs, research aggregation, and crowdsourced problem solving.

This repository currently implements a production-ready MVP foundation:

- A FastAPI backend with authentication, challenge management, startup database initialization, and AI-style problem analysis responses.
- A Next.js mission-control homepage that communicates the platform workflow, core modules, and active challenge portfolio.
- Infrastructure scaffolding for PostgreSQL, Neo4j, Qdrant, Redis, RabbitMQ, Docker, and Kubernetes deployment.

## Stack

- Frontend: Next.js, React, TypeScript, TailwindCSS
- Backend: FastAPI, Python
- Database: PostgreSQL
- Graph DB: Neo4j
- Vector DB: Qdrant
- Search: Elasticsearch
- Cache: Redis
- Message Queue: RabbitMQ
- Deployment: Docker, Kubernetes

## How To Run

### Prerequisites

- Docker Desktop if you want the full stack with one command
- Node.js 18+ and npm if you want to run the frontend locally
- Python 3.11+ and `pip` if you want to run the backend locally

### Option 1: Run With Docker Compose

1. Copy `.env.example` to `.env`.
2. Review `.env` and change `SECRET_KEY` before using the project outside local development.
3. Start everything:

```bash
docker compose up --build
```

4. Open these services after startup:

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000`
- Backend docs: `http://localhost:8000/docs`
- Neo4j Browser: `http://localhost:7474`
- RabbitMQ UI: `http://localhost:15672`
- Qdrant: `http://localhost:6333`

5. Stop the stack when finished:

```bash
docker compose down
```

### Option 2: Run Locally Without Docker

1. Copy `.env.example` to `.env`.
2. Make sure PostgreSQL, Neo4j, Redis, RabbitMQ, and Qdrant are running and update `.env` if their URLs differ from the defaults.

3. Install backend dependencies:

```bash
cd backend
pip install -r requirements.txt
```

4. Start the backend:

```bash
uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000
```

5. In a new terminal, install frontend dependencies:

```bash
cd frontend
npm install
```

6. Start the frontend:

```bash
npm run dev
```

7. Open:

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000`
- Backend docs: `http://localhost:8000/docs`

### Default Service Configuration

- PostgreSQL: `postgresql+psycopg://postgres:postgres@postgres:5432/tipp`
- Neo4j: `bolt://neo4j:7687`
- Redis: `redis://redis:6379/0`
- RabbitMQ: `amqp://guest:guest@rabbitmq:5672/`
- Qdrant: `http://qdrant:6333`

### Useful Commands

```bash
docker compose up --build
docker compose down
cd frontend && npm run build
cd backend && uvicorn backend.app.main:app --reload
```

## Project Structure

- `backend/`: FastAPI service, data models, API endpoints, AI connectors
- `frontend/`: Next.js application
- `sql/`: PostgreSQL schema definitions
- `neo4j/`: Graph schema and startup queries
- `qdrant/`: Vector search setup
- `docs/`: Architecture, deployment, API, security, and user documentation

## Recommended Flow

1. Submit a problem statement.
2. AI analyzes and decomposes the challenge into a hierarchical problem tree.
3. Build knowledge graphs and link research, contributors, and proposed solutions.
4. Use simulation, evaluation, and impact scoring to validate solutions.
5. Launch collaborative workstreams, bounties, and innovation challenges.

## Current API Highlights

- `GET /api/v1/healthz`: Liveness check.
- `GET /api/v1/platform-overview`: Platform capability summary for dashboards or health pages.
- `POST /api/v1/problems`: Create a structured challenge with metadata such as urgency, stakeholders, and success metrics.
- `GET /api/v1/problems/{problem_id}/analysis`: Return an AI-generated mission brief, root causes, intervention tracks, research queries, and next actions.
