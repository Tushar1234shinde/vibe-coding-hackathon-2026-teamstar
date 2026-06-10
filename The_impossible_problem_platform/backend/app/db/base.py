from sqlmodel import SQLModel

from backend.app.models.comment import Comment
from backend.app.models.problem import Problem
from backend.app.models.solution import Solution
from backend.app.models.user import User

models = [User, Problem, Solution, Comment]

def create_db_and_tables(engine):
    SQLModel.metadata.create_all(engine)
