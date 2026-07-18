import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def create_embeddings(chunks):

    texts = [chunk["text"] for chunk in chunks]

    response = client.models.embed_content(
        model="gemini-embedding-001",
        contents=texts
    )

    embeddings = [
        embedding.values
        for embedding in response.embeddings
    ]

    return embeddings