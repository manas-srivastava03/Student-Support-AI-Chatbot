from fastapi import FastAPI

app = FastAPI(title="Student Support AI")


@app.get("/api/health")
def health_check():
    return {"status": "ok"}
