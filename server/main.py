import os
import time
from datetime import datetime

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from pymongo import MongoClient

from rag.retriever import retrieve_chunks

# ----------------------------
# Load Environment Variables
# ----------------------------
load_dotenv()

# ----------------------------
# FastAPI App
# ----------------------------
app = FastAPI(title="Student Support AI")

# ----------------------------
# Enable CORS
# ----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://student-support-ai-chatbot.vercel.app",],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------
# Gemini Client
# ----------------------------
client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

# ----------------------------
# MongoDB Connection
# ----------------------------
mongo_client = MongoClient(os.getenv("MONGODB_URI"))

db = mongo_client["student_support_ai"]
messages_collection = db["messages"]

# ----------------------------
# Request Model
# ----------------------------
class ChatRequest(BaseModel):
    message: str
    category: str = "admission"

# ----------------------------
# Health Check
# ----------------------------
@app.get("/api/health")
def health_check():
    return {"status": "ok"}

@app.get("/")
def root():
    return {"message": "Student Support AI Backend is running"}

# ----------------------------
# Clear Chat History
# ----------------------------
@app.delete("/api/messages")
def clear_messages():
    messages_collection.delete_many({})
    return {"message": "Chat history cleared"}

# ----------------------------
# Get Chat History
# ----------------------------
@app.get("/api/messages")
def get_messages():
    messages = list(messages_collection.find({}, {"_id": 0}))
    return messages

# ----------------------------
# Chat Endpoint
# ----------------------------
@app.post("/api/chat")
def chat(request: ChatRequest):

    # Retrieve relevant chunks from FAISS
    retrieved_chunks = retrieve_chunks(
        request.message,
        category=request.category
    )

    # Combine retrieved chunks into context
    context = "\n\n".join(
        chunk["text"] for chunk in retrieved_chunks
    )
    print("\n========== RETRIEVED CONTEXT ==========\n")
    print(context)
    print("\n=======================================\n")

    # Prompt for Gemini
    prompt = f"""
You are Student Support AI.

Answer the student's question ONLY using the context below.

If the answer is not available in the context, reply exactly:

"I couldn't find this information in the uploaded college documents. Please contact the college administration."

------------------------
Context:
{context}
------------------------

Student Question:
{request.message}
"""

    # Save User Message
    messages_collection.insert_one({
        "sender": "user",
        "text": request.message,
        "timestamp": datetime.utcnow()
    })

    print("✅ User message saved to MongoDB")

    # Retry Gemini up to 3 times
    for attempt in range(3):

        try:

            start = time.time()

            response = client.models.generate_content(
                model="gemini-flash-latest",
                contents=prompt,
            )

            end = time.time()

            print(f"Gemini response time: {end-start:.2f} seconds")

            # Save Bot Reply
            messages_collection.insert_one({
                "sender": "bot",
                "text": response.text,
                "timestamp": datetime.utcnow()
            })

            print("✅ Bot message saved to MongoDB")

            return {
                "reply": response.text
            }

        except Exception as e:

            print("Gemini Error:", e)

            if attempt == 2:
                return {
                    "reply": "⚠️ Student Support AI is currently busy. Please try again in a few seconds."
                }

            time.sleep(2)