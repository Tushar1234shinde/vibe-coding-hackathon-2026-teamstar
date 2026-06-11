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


class ProblemSubProblem(SQLModel):
    title: str
    category: str
    urgency: str
    description: str


class ProblemDecompositionRead(SQLModel):
    problem_id: int
    root_causes: List[str]
    stakeholders: List[str]
    dependencies: List[str]
    subproblems: List[ProblemSubProblem]


class ResearchAssistantRead(SQLModel):
    problem_id: int
    root_causes: List[str]
    existing_solutions: List[str]
    failed_solutions: List[str]
    emerging_technologies: List[str]


class SolutionOption(SQLModel):
    title: str
    description: str
    solution_type: str
    cost_estimate: str
    difficulty: str
    impact_rating: int
    time_to_implement: str


class SolutionGeneratorRead(SQLModel):
    problem_id: int
    solutions: List[SolutionOption]


class RoadmapPhase(SQLModel):
    name: str
    tasks: List[str]
    resources: List[str]
    timeline: str
    risks: str


class RoadmapRead(SQLModel):
    problem_id: int
    phases: List[RoadmapPhase]


class KnowledgeGraphNode(SQLModel):
    id: str
    label: str
    node_type: str


class KnowledgeGraphEdge(SQLModel):
    source: str
    target: str
    relation: str


class KnowledgeGraphRead(SQLModel):
    problem_id: int
    nodes: List[KnowledgeGraphNode]
    edges: List[KnowledgeGraphEdge]


class SolutionImpactScore(SQLModel):
    problem_id: int
    feasibility: float
    cost_efficiency: float
    scalability: float
    environmental_impact: float


class CommentCreate(SQLModel):
    content: str


class CommentRead(SQLModel):
    id: int
    problem_id: int
    user_id: int
    content: str
    upvotes: int
    created_at: datetime
