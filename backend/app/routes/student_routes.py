from fastapi import APIRouter
from app.models.student import Student
from app.database import students_collection

router = APIRouter()

@router.post("/student")
def create_student(student: Student):

    students_collection.insert_one(student.dict())

    return {
        "message": "Student profile created successfully"
    }