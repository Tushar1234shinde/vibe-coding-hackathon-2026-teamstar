from __future__ import annotations

from datetime import datetime
from typing import Optional

from sqlmodel import SQLModel, Field, Relationship


class Comment(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    problem_id: Optional[int] = Field(default=None, foreign_key="problem.id")
    user_id: Optional[int] = Field(default=None, foreign_key="user.id")
    content: str
    upvotes: int = Field(default=0)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    author: Optional["User"] = Relationship(back_populates="comments")
    problem: Optional["Problem"] = Relationship(back_populates="comments")
