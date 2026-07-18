import os

from rag.pdf_loader import load_pdf
from rag.chunker import chunk_text
from rag.embeddings import create_embeddings
from rag.vector_store import create_vector_store, save_vector_store

DATA_DIR = "data"

# =====================================================
# Build only one category at a time.
# Change this value to the folder name you want to build.
# Examples:
# "admission"
# "academic"
# "examination"
# "hostel"
# "scholarship"
#
# Set to None to build all categories.
# =====================================================
BUILD_ONLY = "None"

for category in os.listdir(DATA_DIR):

    category_path = os.path.join(DATA_DIR, category)

    # Skip other categories if BUILD_ONLY is set
    if BUILD_ONLY is not None and category != BUILD_ONLY:
        continue

    if not os.path.isdir(category_path):
        continue

    all_chunks = []

    print(f"\nBuilding index for: {category}")

    for file in os.listdir(category_path):

        if file.endswith(".pdf"):

            pdf_path = os.path.join(category_path, file)

            print(f"\nReading {file}")

            pages = load_pdf(pdf_path)

            chunks = chunk_text(pages)

            print(f"\n{file}: Total chunks = {len(chunks)}")

            # Debug: print first 3 chunks
            for i, chunk in enumerate(chunks[:3]):
                print(f"\nChunk {i+1} ({len(chunk['text'])} chars)")
                print("-" * 40)
                print(chunk["text"])
                print("-" * 40)

            all_chunks.extend(chunks)

    if not all_chunks:
        print("No PDFs found.")
        continue

    print(f"\nCreating embeddings for {len(all_chunks)} chunks...")

    embeddings = create_embeddings(all_chunks)

    print("Creating FAISS index...")

    index = create_vector_store(embeddings)

    save_vector_store(index, all_chunks, category)

    print(f"\n✅ {category} completed successfully.")

print("\n🎉 Selected index build completed!")