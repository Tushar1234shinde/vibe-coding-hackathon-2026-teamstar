from qdrant_client import QdrantClient
from qdrant_client.http import models as rest
from backend.app.core.config import settings

class QdrantService:
    def __init__(self):
        self.client = QdrantClient(url=settings.QDRANT_URL)

    def ensure_collection(self, collection_name: str):
        self.client.recreate_collection(
            collection_name=collection_name,
            vectors_config=rest.VectorParams(size=1536, distance=rest.Distance.COSINE),
        )

    def index_document(self, collection_name: str, doc_id: str, vector: list[float], metadata: dict):
        self.client.upsert(
            collection_name=collection_name,
            points=[rest.PointStruct(id=doc_id, vector=vector, payload=metadata)],
        )

    def semantic_search(self, collection_name: str, query_vector: list[float], top_k: int = 10):
        return self.client.search(collection_name=collection_name, query_vector=query_vector, top=top_k)
