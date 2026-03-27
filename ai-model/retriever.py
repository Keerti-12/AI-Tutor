from embeddings import embed_query
from vector_store import get_index

index = get_index()

def retrieve_context(query):
    try:
        vector = embed_query(query)

        result = index.query(
            vector=vector,
            top_k=3,
            include_metadata=True
        )

        matches = result.get("matches", [])

        if not matches:
            return None

        context = "\n".join(
            m["metadata"]["text"]
            for m in matches
            if "metadata" in m
        )

        return context

    except Exception:
        return None