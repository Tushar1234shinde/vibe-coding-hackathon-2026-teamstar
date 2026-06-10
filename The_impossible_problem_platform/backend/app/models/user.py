from __future__ import annotations
from datetime import datetime
from enum import Enum
from typing import List, Optional, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from backend.app.models.problem import Problem

class UserRole(str, Enum):
    CONTRIBUTOR = "contributor"
    RESEARCHER = "researcher"
    STUDENT = "student"
    STARTUP = "startup_founder"
    NGO = "ngo"
    GOVERNMENT = "government"
    ENTERPRISE = "enterprise"
    ADMIN = "admin"

class UserBase(SQLModel):
    email: str = Field(index=True)
    full_name: Optional[str] = None
    role: UserRole = Field(default=UserRole.CONTRIBUTOR)
    expertise_areas: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None

class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    hashed_password: str
    is_active: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    contributions: List["Problem"] = Relationship(back_populates="owner")

class UserCreate(UserBase):
    password: str

class UserRead(UserBase):
    id: int
    is_active: bool
    created_at: datetime

class UserUpdate(SQLModel):
    full_name: Optional[str] = None
    expertise_areas: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    role: Optional[UserRole] = None
