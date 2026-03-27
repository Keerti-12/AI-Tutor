import os
from embeddings import embed_documents
from vector_store import get_index
from langchain_text_splitters import RecursiveCharacterTextSplitter

DATA_FOLDER = "data"

def train_if_data_exists():
    if not os.path.exists(DATA_FOLDER):
        return 0

    files = os.listdir(DATA_FOLDER)

    if len(files) == 0:
        return 0

    docs = []

    for file in files:
        path = os.path.join(DATA_FOLDER, file)

        with open(path, "r", encoding="utf-8") as f:
            docs.append(f.read())

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50
    )

    chunks = []
    for doc in docs:
        chunks.extend(splitter.split_text(doc))

    embeddings = embed_documents(chunks)

    index = get_index()

    vectors = []
    for i, emb in enumerate(embeddings):
        vectors.append({
            "id": f"doc-{i}",
            "values": emb.tolist(),
            "metadata": {"text": chunks[i]}
        })

    index.upsert(vectors=vectors)

    return len(vectors)