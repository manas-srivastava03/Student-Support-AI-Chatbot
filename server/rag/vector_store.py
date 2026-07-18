import faiss
import numpy as np
import pickle
import os


def create_vector_store(embeddings):
    embeddings = np.array(embeddings, dtype=np.float32)

    dimension = embeddings.shape[1]

    index = faiss.IndexFlatL2(dimension)

    index.add(embeddings)

    return index


def save_vector_store(index, chunks, category):
    os.makedirs("vector_db", exist_ok=True)

    faiss.write_index(index, f"vector_db/{category}.index")

    with open(f"vector_db/{category}_chunks.pkl", "wb") as f:
        pickle.dump(chunks, f)


def load_vector_store(category):
    index = faiss.read_index(f"vector_db/{category}.index")

    with open(f"vector_db/{category}_chunks.pkl", "rb") as f:
        chunks = pickle.load(f)

    return index, chunks