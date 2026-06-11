from datetime import datetime
from typing import Optional
from pydantic import EmailStr
from backend.app.models.user import UserRole

from sqlmodel import SQLModel

class UserCreate(SQLModel):
    email: EmailStr
    password: str
    full_name: Optional[str] = None
    role: Optional[UserRole] = UserRole.CONTRIBUTOR

class UserRead(SQLModel):
    id: int
    email: EmailStr
    full_name: Optional[str] = None
    role: UserRole
    expertise_areas: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    is_active: bool
    created_at: datetime

class UserUpdate(SQLModel):
    full_name: Optional[str] = None
    expertise_areas: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    role: Optional[UserRole] = None
