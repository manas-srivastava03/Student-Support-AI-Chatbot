import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai

# Load environment variables
load_dotenv()

app = FastAPI(title="Student Support AI")

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Gemini client
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


class ChatRequest(BaseModel):
    message: str


@app.get("/api/health")
def health_check():
    return {"status": "ok"}


@app.post("/api/chat")
def chat(request: ChatRequest):
    try:
        response = client.models.generate_content(
            model="gemini-flash-latest",
            contents=f"""
You are Student Support AI.

You help students with:
- Admissions
- Fees
- Scholarships
- Exams
- Courses
- General college questions

Be polite.
Be concise.
Keep answers under 150 words.

Student Question:
{request.message}
"""
        )

        return {
            "reply": response.text
        }

    except Exception as e:
        return {
            "reply": f"Error: {str(e)}"
        }