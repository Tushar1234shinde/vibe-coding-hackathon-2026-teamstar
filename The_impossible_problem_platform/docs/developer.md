# Developer Documentation

## Local Development

- Backend: `cd backend && uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000`
- Frontend: `cd frontend && npm install && npm run dev`

## Code Structure

- `backend/app/api/v1`: REST endpoints
- `backend/app/models`: SQLModel definitions for users and problems
- `backend/app/services`: Business logic and external connectors
- `frontend/app`: Next.js application pages

## Next Steps

- Add AI problem decomposition and research aggregation modules.
- Implement Neo4j/graph data ingestion.
- Add Semantic Search with Qdrant and Elasticsearch.
- Build collaboration workspace components and solution repository support.
