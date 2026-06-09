from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select
from backend.app.db.session import get_session
from backend.app.schemas.token import Token
from backend.app.schemas.user import UserCreate, UserRead
from backend.app.services.auth_service import authenticate_user, create_user
from backend.app.core.security import create_access_token
from backend.app.models.user import User

router = APIRouter()

@router.post("/register", response_model=UserRead)
def register(user_create: UserCreate, session: Session = Depends(get_session)):
    existing = session.exec(select(User).where(User.email == user_create.email)).one_or_none()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    return create_user(user_create, session)

@router.post("/token", response_model=Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_session)):
    user = authenticate_user(form_data.username, form_data.password, session)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=60)
    access_token = create_access_token(subject=user.email, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}
