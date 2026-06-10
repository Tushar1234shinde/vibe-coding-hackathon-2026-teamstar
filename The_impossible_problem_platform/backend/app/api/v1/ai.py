from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from backend.app.core.security import get_current_user
from backend.app.db.session import get_session
from backend.app.models.comment import Comment
from backend.app.models.problem import Problem
from backend.app.models.user import User
from backend.app.schemas.problem import (
    CommentCreate,
    CommentRead,
    KnowledgeGraphRead,
    ProblemDecompositionRead,
    ResearchAssistantRead,
    RoadmapRead,
    SolutionGeneratorRead,
    SolutionImpactScore,
)
from backend.app.services.ai_service import (
    generate_knowledge_graph,
    generate_problem_decomposition,
    generate_project_roadmap,
    generate_research_assistant,
    generate_solution_options,
    score_solution_options,
)

router = APIRouter()


def _get_problem(problem_id: int, session: Session) -> Problem:
    problem = session.get(Problem, problem_id)
    if not problem:
        raise HTTPException(status_code=404, detail="Problem not found")
    return problem


@router.get("/{problem_id}/decompose", response_model=ProblemDecompositionRead)
def decompose_problem(problem_id: int, session: Session = Depends(get_session)):
    problem = _get_problem(problem_id, session)
    return generate_problem_decomposition(problem)


@router.get("/{problem_id}/research", response_model=ResearchAssistantRead)
def research_assistant(problem_id: int, session: Session = Depends(get_session)):
    problem = _get_problem(problem_id, session)
    return generate_research_assistant(problem)


@router.get("/{problem_id}/solutions", response_model=SolutionGeneratorRead)
def get_solution_options(problem_id: int, session: Session = Depends(get_session)):
    problem = _get_problem(problem_id, session)
    return generate_solution_options(problem)


@router.get("/{problem_id}/roadmap", response_model=RoadmapRead)
def get_roadmap(problem_id: int, session: Session = Depends(get_session)):
    problem = _get_problem(problem_id, session)
    return generate_project_roadmap(problem)


@router.get("/{problem_id}/impact", response_model=SolutionImpactScore)
def get_impact_score(problem_id: int, session: Session = Depends(get_session)):
    problem = _get_problem(problem_id, session)
    solution_options = generate_solution_options(problem)
    return score_solution_options(problem, solution_options)


@router.get("/{problem_id}/knowledge-graph", response_model=KnowledgeGraphRead)
def knowledge_graph(problem_id: int, session: Session = Depends(get_session)):
    problem = _get_problem(problem_id, session)
    return generate_knowledge_graph(problem)


@router.post("/{problem_id}/comments", response_model=CommentRead)
def create_comment(problem_id: int, comment_in: CommentCreate, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    problem = _get_problem(problem_id, session)
    comment = Comment(
        problem_id=problem.id,
        user_id=current_user.id,
        content=comment_in.content,
    )
    session.add(comment)
    session.commit()
    session.refresh(comment)
    return CommentRead(
        id=comment.id,
        problem_id=comment.problem_id,
        user_id=comment.user_id,
        content=comment.content,
        upvotes=comment.upvotes,
        created_at=comment.created_at,
    )


@router.get("/{problem_id}/comments", response_model=List[CommentRead])
def list_comments(problem_id: int, session: Session = Depends(get_session)):
    _get_problem(problem_id, session)
    statement = select(Comment).where(Comment.problem_id == problem_id).order_by(Comment.created_at.desc())
    return session.exec(statement).all()
