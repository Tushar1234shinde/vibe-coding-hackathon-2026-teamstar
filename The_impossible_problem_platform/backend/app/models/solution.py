from __future__ import annotations

from datetime import datetime
from typing import Optional

from sqlmodel import SQLModel, Field, Relationship


class Solution(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    problem_id: Optional[int] = Field(default=None, foreign_key="problem.id")
    title: str
    description: str
    solution_type: str
    cost_estimate: str
    difficulty: str
    impact_rating: int
    time_to_implement: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    owner_id: Optional[int] = Field(default=None, foreign_key="user.id")
    owner: Optional["User"] = Relationship(back_populates="solutions")
    problem: Optional["Problem"] = Relationship(back_populates="solutions")
