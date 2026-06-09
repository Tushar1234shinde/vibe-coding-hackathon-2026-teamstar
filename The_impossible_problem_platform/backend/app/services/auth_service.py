from backend.app.core.security import get_password_hash, verify_password
from backend.app.models.user import User
from backend.app.schemas.user import UserCreate
from sqlmodel import Session, select


def authenticate_user(email: str, password: str, session: Session) -> User | None:
    user = session.exec(select(User).where(User.email == email)).one_or_none()
    if not user or not verify_password(password, user.hashed_password):
        return None
    return user


def create_user(user_create: UserCreate, session: Session) -> User:
    user = User(
        email=user_create.email,
        full_name=user_create.full_name,
        role=user_create.role,
        hashed_password=get_password_hash(user_create.password),
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    return user
