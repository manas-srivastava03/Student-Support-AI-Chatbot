import os

from rag.pdf_loader import load_pdf
from rag.chunker import chunk_text
from rag.embeddings import create_embeddings
from rag.vector_store import create_vector_store, save_vector_store

DATA_DIR = "data"

for category in os.listdir(DATA_DIR):

    category_path = os.path.join(DATA_DIR, category)

    if not os.path.isdir(category_path):
        continue

    all_chunks = []

    print(f"\nBuilding index for: {category}")

    for file in os.listdir(category_path):

        if file.endswith(".pdf"):

            pdf_path = os.path.join(category_path, file)

            print(f"Reading {file}")

            pages = load_pdf(pdf_path)

            chunks = chunk_text(pages)

            all_chunks.extend(chunks)

    if not all_chunks:
        print("No PDFs found.")
        continue

    embeddings = create_embeddings(all_chunks)

    index = create_vector_store(embeddings)

    save_vector_store(index, all_chunks, category)

    print(f"{category} completed.")

print("\nAll indexes built successfully!")