from datetime import datetime
from fastapi import HTTPException
from sqlmodel import Session, select

from backend.app.models.problem import Problem, ProblemUpdate
from backend.app.models.user import User
from backend.app.schemas.problem import (
    ProblemAnalysisNode,
    ProblemAnalysisRead,
    ProblemCreate,
    ProblemOpportunity,
)


def create_problem(problem_in: ProblemCreate, owner: User, session: Session) -> Problem:
    problem = Problem(
        **problem_in.model_dump(),
        owner_id=owner.id,
        ai_summary=problem_in.ai_summary or build_ai_summary(problem_in.title, problem_in.description),
    )
    session.add(problem)
    session.commit()
    session.refresh(problem)
    return problem


def list_problems(session: Session) -> list[Problem]:
    statement = select(Problem).order_by(Problem.created_at.desc())
    return session.exec(statement).all()


def update_problem(problem_id: int, problem_update: ProblemUpdate, owner: User, session: Session) -> Problem:
    problem = session.get(Problem, problem_id)
    if not problem:
        raise HTTPException(status_code=404, detail="Problem not found")
    if problem.owner_id != owner.id and owner.role != "admin":
        raise HTTPException(status_code=403, detail="Insufficient permissions")
    for key, value in problem_update.model_dump(exclude_unset=True).items():
        setattr(problem, key, value)
    if not problem.ai_summary:
        problem.ai_summary = build_ai_summary(problem.title, problem.description)
    problem.updated_at = datetime.utcnow()
    session.add(problem)
    session.commit()
    session.refresh(problem)
    return problem


def build_ai_summary(title: str, description: str) -> str:
    return (
        f"{title} is being treated as a systems challenge. "
        f"The platform will decompose it into root causes, intervention tracks, evidence needs, "
        f"and collaboration opportunities based on this brief: {description[:220]}"
    )


def generate_problem_analysis(problem: Problem) -> ProblemAnalysisRead:
    context = f"{problem.title} {problem.description} {problem.category or ''}".lower()

    if "plastic" in context:
        root_causes = [
            "Low-cost virgin plastic outcompetes circular materials.",
            "Collection and sorting infrastructure is fragmented across cities.",
            "Consumer incentives and producer accountability are misaligned.",
        ]
        intervention_tracks = [
            ProblemAnalysisNode(
                name="Material Transition",
                objective="Reduce dependence on virgin polymers and expand circular alternatives.",
                evidence_needed=["Packaging composition data", "Lifecycle cost models", "Policy benchmarks"],
                suggested_collaborators=["Materials scientists", "FMCG operators", "Policy researchers"],
            ),
            ProblemAnalysisNode(
                name="Collection Intelligence",
                objective="Improve capture rates through better routing, sorting, and informal sector integration.",
                evidence_needed=["Waste flow maps", "Municipal operations data", "Recycling capacity audit"],
                suggested_collaborators=["City operators", "Data scientists", "Waste picker networks"],
            ),
            ProblemAnalysisNode(
                name="Behavior and Policy",
                objective="Shift incentives for households, producers, and regulators.",
                evidence_needed=["Consumer survey data", "EPR policy comparisons", "Behavioral pilot outcomes"],
                suggested_collaborators=["NGOs", "Behavioral economists", "Government agencies"],
            ),
        ]
        research_queries = [
            "Which extended producer responsibility policies measurably reduced plastic leakage?",
            "What sorting technologies improve mixed-plastic recovery rates in dense urban regions?",
            "Which reuse models sustain unit economics at national scale?",
        ]
    else:
        root_causes = [
            "The challenge spans technical, policy, and adoption constraints.",
            "Evidence is distributed across disconnected research, operator knowledge, and local context.",
            "Coordination gaps slow down experimentation and scaled implementation.",
        ]
        intervention_tracks = [
            ProblemAnalysisNode(
                name="Systems Mapping",
                objective="Create a shared view of causes, actors, and leverage points.",
                evidence_needed=["Baseline metrics", "Stakeholder map", "Constraint inventory"],
                suggested_collaborators=["Domain experts", "Knowledge graph engineers", "Policy analysts"],
            ),
            ProblemAnalysisNode(
                name="Pilot Design",
                objective="Translate hypotheses into testable interventions with measurable outcomes.",
                evidence_needed=["Comparable case studies", "Operational requirements", "Risk assumptions"],
                suggested_collaborators=["Researchers", "Local operators", "Startup builders"],
            ),
            ProblemAnalysisNode(
                name="Scale Pathway",
                objective="Identify funding, regulation, and partnerships needed for rollout.",
                evidence_needed=["Unit economics", "Compliance requirements", "Implementation roadmap"],
                suggested_collaborators=["Investors", "Government partners", "Enterprises"],
            ),
        ]
        research_queries = [
            f"What failed interventions are most relevant to {problem.title}?",
            f"Which organizations already hold actionable datasets about {problem.title}?",
            f"What emerging technologies could shift the feasibility frontier for {problem.title}?",
        ]

    next_actions = [
        "Validate the decomposition with two domain specialists and one frontline operator.",
        "Ingest supporting research, case studies, and datasets into the knowledge base.",
        "Open subproblem workstreams with owners, milestones, and evaluation metrics.",
    ]

    return ProblemAnalysisRead(
        problem_id=problem.id or 0,
        mission_brief=problem.ai_summary or build_ai_summary(problem.title, problem.description),
        root_causes=root_causes,
        intervention_tracks=intervention_tracks,
        research_queries=research_queries,
        collaboration_gaps=[
            "Need stronger local implementation perspective.",
            "Need evidence synthesis across academic and gray literature.",
            "Need early feasibility modeling before solution ranking.",
        ],
        next_actions=next_actions,
        opportunities=[
            ProblemOpportunity(
                title="Cross-sector pilot consortium",
                why_now="The platform can coordinate researchers, operators, and funders around one measurable trial.",
                feasibility="Medium",
            ),
            ProblemOpportunity(
                title="Evidence-backed solution leaderboard",
                why_now="Contributors need a transparent way to compare proposed interventions.",
                feasibility="High",
            ),
        ],
    )
