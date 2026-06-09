# System Architecture

## Overview

The Impossible Problem Platform connects AI, research, collaboration, and knowledge graph systems into a unified platform.

### Core layers

- **Frontend**: Next.js app providing mission-control dashboards, problem submission, collaboration spaces, and visualizations.
- **Backend**: FastAPI service for user management, problem decomposition, knowledge aggregation, and AI orchestration.
- **Persistence**: PostgreSQL for core relational data, Neo4j for the knowledge graph, Qdrant for vector search, Elasticsearch for full-text search, Redis for caching, RabbitMQ for message orchestration.
- **AI Providers**: OpenAI, Anthropic, Gemini, Ollama used for decomposition, summarization, recommendation, and simulation.

## Service Diagram

1. User submits a problem.
2. Backend stores the problem in PostgreSQL.
3. AI analysis modules decompose the problem and generate hierarchical subproblems.
4. Neo4j stores relationships between problems, solutions, research, and people.
5. Qdrant indexes semantic vectors for search and matching.
6. Frontend visualizes dashboards, knowledge maps, and collaboration boards.
