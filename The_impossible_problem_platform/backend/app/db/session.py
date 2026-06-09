from sqlmodel import create_engine, Session
from backend.app.core.config import settings

engine = create_engine(settings.DATABASE_URL, echo=False, future=True)

def get_session() -> Session:
    with Session(engine) as session:
        yield session
