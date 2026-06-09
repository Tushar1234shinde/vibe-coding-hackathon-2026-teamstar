from datetime import datetime
from typing import List, Optional

from sqlmodel import SQLModel


class ProblemCreate(SQLModel):
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

class ProblemRead(ProblemCreate):
    id: int
    owner_id: Optional[int]
    created_at: datetime
    updated_at: datetime

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


class ProblemAnalysisNode(SQLModel):
    name: str
    objective: str
    evidence_needed: List[str]
    suggested_collaborators: List[str]


class ProblemOpportunity(SQLModel):
    title: str
    why_now: str
    feasibility: str


class ProblemAnalysisRead(SQLModel):
    problem_id: int
    mission_brief: str
    root_causes: List[str]
    intervention_tracks: List[ProblemAnalysisNode]
    research_queries: List[str]
    collaboration_gaps: List[str]
    next_actions: List[str]
    opportunities: List[ProblemOpportunity]
