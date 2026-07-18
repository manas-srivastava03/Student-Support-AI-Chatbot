import os
import numpy as np

from dotenv import load_dotenv
from google import genai

from rag.vector_store import load_vector_store

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def retrieve_chunks(question, category="admission", top_k=3):

    index, chunks = load_vector_store(category)

    response = client.models.embed_content(
        model="gemini-embedding-001",
        contents=question
    )

    query_embedding = np.array(
        [response.embeddings[0].values],
        dtype=np.float32
    )

    distances, indices = index.search(
        query_embedding,
        top_k
    )

    results = []

    for idx in indices[0]:
        results.append(chunks[idx])

    return results