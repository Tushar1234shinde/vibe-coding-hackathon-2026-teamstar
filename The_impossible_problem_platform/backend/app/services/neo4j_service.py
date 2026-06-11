from neo4j import GraphDatabase
from backend.app.core.config import settings

class Neo4jService:
    def __init__(self):
        self.driver = GraphDatabase.driver(
            settings.NEO4J_URI,
            auth=(settings.NEO4J_USER, settings.NEO4J_PASSWORD),
        )

    def close(self):
        self.driver.close()

    def create_problem_node(self, problem_id: int, title: str, category: str | None):
        with self.driver.session() as session:
            session.run(
                "MERGE (p:Problem {id: $id, title: $title, category: $category})",
                id=problem_id,
                title=title,
                category=category,
            )

    def link_problem_to_user(self, problem_id: int, user_email: str):
        with self.driver.session() as session:
            session.run(
                "MATCH (u:User {email: $email}), (p:Problem {id: $id}) MERGE (u)-[:SUBMITTED]->(p)",
                email=user_email,
                id=problem_id,
            )

    def create_relationship(self, source_id: int, target_id: int, relation: str):
        with self.driver.session() as session:
            session.run(
                "MATCH (a:Problem {id: $source}), (b:Problem {id: $target}) MERGE (a)-[r:%s]->(b)" % relation,
                source=source_id,
                target=target_id,
            )
