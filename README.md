# Student Support AI

A beginner-friendly AI chatbot for college-related student queries.

## Project Structure

```
├── client/          # React + Vite frontend
├── server/          # FastAPI backend
└── PROJECT_PLAN.md  # Feature roadmap
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Python](https://www.python.org/) (v3.10 or later)

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

The app runs at [http://localhost:5173](http://localhost:5173).

## Backend Setup

Create and activate a virtual environment (recommended):

```bash
cd server
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate
```

Install dependencies and start the server:

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

The API runs at [http://localhost:8000](http://localhost:8000).

### Test Endpoint

- **GET** `/api/health` — returns `{"status": "ok"}`
- Interactive docs: [http://localhost:8000/docs](http://localhost:8000/docs)

## Tech Stack

| Layer    | Technology        |
| -------- | ----------------- |
| Frontend | React, Vite, Tailwind CSS |
| Backend  | Python, FastAPI   |
| Database | MongoDB Atlas *(planned)* |
| AI       | Google Gemini API *(planned)* |
