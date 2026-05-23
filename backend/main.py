from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "CareerPilot AI Backend Running"}