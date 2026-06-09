from pathlib import Path
from typing import List

from pydantic import AnyHttpUrl
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "The Impossible Problem Platform"
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = ["http://localhost:3000"]
    DATABASE_URL: str = "postgresql+psycopg://postgres:postgres@postgres:5432/tipp"
    SECRET_KEY: str = "replace-this-secret-key"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24
    NEO4J_URI: str = "bolt://neo4j:7687"
    NEO4J_USER: str = "neo4j"
    NEO4J_PASSWORD: str = "password"
    QDRANT_URL: str = "http://qdrant:6333"
    REDIS_URL: str = "redis://redis:6379/0"
    RABBITMQ_URL: str = "amqp://guest:guest@rabbitmq:5672/"
    model_config = SettingsConfigDict(
        env_file=Path(__file__).parent.parent.parent / ".env",
        env_file_encoding="utf-8",
    )

settings = Settings()
