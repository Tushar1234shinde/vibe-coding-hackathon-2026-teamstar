from __future__ import annotations

from datetime import datetime
from typing import List, Optional, TYPE_CHECKING

from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from backend.app.models.user import User


class ProblemBase(SQLModel):
    title: str
    description: str
    category: Optional[str] = None
    geographic_scope: Optional[str] = None
    impact_level: Optional[str] = None
    existing_solutions: Optional[str] = None
    supporting_documents: Optional[str] = None
    status: str = "intake"
    urgency: str = "high"
    stakeholders: Optional[str] = None
    success_metrics: Optional[str] = None
    ai_summary: Optional[str] = None

class Problem(ProblemBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    owner_id: Optional[int] = Field(default=None, foreign_key="user.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    owner: Optional[User] = Relationship(back_populates="contributions")
    solutions: List["Solution"] = Relationship(back_populates="problem")
    comments: List["Comment"] = Relationship(back_populates="problem")

class ProblemUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    geographic_scope: Optional[str] = None
    impact_level: Optional[str] = None
    existing_solutions: Optional[str] = None
    supporting_documents: Optional[str] = None
    status: Optional[str] = None
    urgency: Optional[str] = None
    stakeholders: Optional[str] = None
    success_metrics: Optional[str] = None
    ai_summary: Optional[str] = None
