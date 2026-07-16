import os
import time
from datetime import datetime

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from pymongo import MongoClient

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
    allow_origins=["http://localhost:5173"],
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

# ----------------------------
# Health Check
# ----------------------------
@app.get("/api/health")
def health_check():
    return {"status": "ok"}

# ----------------------------
# Chat Endpoint
# ----------------------------


@app.get("/api/messages")
def get_messages():
    messages = list(messages_collection.find({}, {"_id": 0}))
    return messages



@app.post("/api/chat")
def chat(request: ChatRequest):

    prompt = f"""
You are Student Support AI.

Rules:
- Answer only college-related questions.
- If the user asks a general question, answer briefly.
- Keep the answer under 80 words.
- Be friendly and professional.

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
                model="gemini-3.5-flash",
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