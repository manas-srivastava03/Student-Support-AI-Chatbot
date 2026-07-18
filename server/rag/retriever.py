import numpy as np
from sentence_transformers import SentenceTransformer
from rag.vector_store import load_vector_store

model = SentenceTransformer("paraphrase-MiniLM-L3-v2")


def retrieve_chunks(question, category="admission", top_k=5):

    index, chunks = load_vector_store(category)

    query_embedding = model.encode([question])

    distances, indices = index.search(
        np.array(query_embedding),
        top_k
    )

    results = []

    for idx in indices[0]:
        results.append(chunks[idx])

    return results