from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from backend.app.db.session import get_session
from backend.app.core.security import get_current_user
from backend.app.models.user import User
from backend.app.models.problem import Problem
from backend.app.schemas.problem import ProblemAnalysisRead, ProblemCreate, ProblemRead, ProblemUpdate
from backend.app.services.problem_service import create_problem, generate_problem_analysis, list_problems, update_problem

router = APIRouter()

@router.post("/", response_model=ProblemRead)
def create_problem_endpoint(problem_in: ProblemCreate, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    return create_problem(problem_in, current_user, session)

@router.get("/", response_model=List[ProblemRead])
def get_problems(session: Session = Depends(get_session)):
    return list_problems(session)

@router.get("/{problem_id}", response_model=ProblemRead)
def get_problem(problem_id: int, session: Session = Depends(get_session)):
    problem = session.get(Problem, problem_id)
    if not problem:
        raise HTTPException(status_code=404, detail="Problem not found")
    return problem


@router.get("/{problem_id}/analysis", response_model=ProblemAnalysisRead)
def get_problem_analysis(problem_id: int, session: Session = Depends(get_session)):
    problem = session.get(Problem, problem_id)
    if not problem:
        raise HTTPException(status_code=404, detail="Problem not found")
    return generate_problem_analysis(problem)

@router.patch("/{problem_id}", response_model=ProblemRead)
def patch_problem(problem_id: int, problem_update: ProblemUpdate, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    return update_problem(problem_id, problem_update, current_user, session)
