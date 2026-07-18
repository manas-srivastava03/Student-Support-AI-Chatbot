def chunk_text(pages, chunk_size=400, overlap=80):
    chunks = []

    for page in pages:
        text = page["text"]

        start = 0

        while start < len(text):
            end = start + chunk_size

            chunk = text[start:end]

            chunks.append({
                "page": page["page"],
                "text": chunk
            })

            start += chunk_size - overlap

    return chunks