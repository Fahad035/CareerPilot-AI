from pydantic import BaseModel
from typing import List

class Student(BaseModel):
    name: str
    email: str
    department: str
    skills: List[str]
    interests: List[str]
    career_goal: str
    cgpa: float