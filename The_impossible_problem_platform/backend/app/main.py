from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.api.v1 import auth, problems, users
from backend.app.api.v1.ai import router as ai_router
from backend.app.core.config import settings
from backend.app.db.base import create_db_and_tables
from backend.app.db.session import engine


@asynccontextmanager
async def lifespan(_: FastAPI):
    create_db_and_tables(engine)
    yield

app = FastAPI(
    title="The Impossible Problem Platform API",
    version="0.1.0",
    description="AI-driven collaboration API for solving global challenges.",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(users.router, prefix="/api/v1/users", tags=["users"])
app.include_router(problems.router, prefix="/api/v1/problems", tags=["problems"])
app.include_router(ai_router, prefix="/api/v1/problems", tags=["ai"])

@app.get("/api/v1/healthz")
def healthz() -> dict:
    return {"status": "ok"}


@app.get("/api/v1/platform-overview")
def platform_overview() -> dict:
    return {
        "mission": "Solving Humanity's Hardest Problems Through Collective Intelligence.",
        "capabilities": [
            "AI problem decomposition",
            "Research aggregation",
            "Knowledge graph linking",
            "Collaborative solution workspaces",
            "Impact evaluation and simulation readiness",
        ],
        "maturity": "production-ready MVP foundation",
    }
