from fastapi import APIRouter
from app.database import students_collection
from app.services.career_recommender import recommend_career

router = APIRouter()

@router.get("/recommend/{email}")

def get_recommendations(email: str):

    student = students_collection.find_one({
        "email": email
    })

    if not student:
        return {
            "error": "Student not found"
        }

    recommendations = recommend_career(student)

    return {
        "recommended_careers": recommendations
    }