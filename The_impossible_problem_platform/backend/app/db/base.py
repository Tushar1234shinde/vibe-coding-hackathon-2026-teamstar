from sqlmodel import SQLModel

models = []

def create_db_and_tables(engine):
    SQLModel.metadata.create_all(engine)
