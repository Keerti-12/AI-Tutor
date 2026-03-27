from pinecone import Pinecone, ServerlessSpec
from config import PINECONE_API_KEY, PINECONE_INDEX

pc = Pinecone(api_key=PINECONE_API_KEY)

def get_index():
    existing_indexes = [index["name"] for index in pc.list_indexes()]

    if PINECONE_INDEX not in existing_indexes:
        print("\nCreating Pinecone index automatically...")

        pc.create_index(
            name=PINECONE_INDEX,
            dimension=384,   # required for all-MiniLM-L6-v2
            metric="cosine",
            spec=ServerlessSpec(
                cloud="aws",
                region="us-east-1"
            )
        )

        print("Index created successfully")

    return pc.Index(PINECONE_INDEX)