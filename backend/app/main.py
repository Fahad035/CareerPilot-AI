from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.student_routes import router
from app.routes.recommendation_routes import router as recommendation_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
app.include_router(recommendation_router)

@app.get("/")
def home():
    return {
        "message": "CareerPilot AI Backend Running Successfully"
    }