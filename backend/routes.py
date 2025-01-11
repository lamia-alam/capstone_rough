from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Any
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Users, FieldOfInterest

from crud import (
    # create_question,
    get_questions_by_category,
    # get_question_by_id,
    # update_question,
    # delete_question,
)

router = APIRouter()


class User(BaseModel):
    first_name: str
    last_name: str
    email: str
    firebase_id: str
    engineering_discipline: str
    field_of_interest: list[str]

class Question(BaseModel):
    category: str
    question_text: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/create_user")
def create_user(user: User, db: Session = Depends(get_db)):
    db_user = Users(
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        firebase_id=user.firebase_id,
        engineering_discipline=user.engineering_discipline,
    )
    db.add(db_user)
    db.commit()

    for interest in user.field_of_interest:
        db_interest = FieldOfInterest(name=interest, user_id=db_user.id)
        db.add(db_interest)

    db.commit()
    db.refresh(db_user)
    return {"message": "User created successfully", "user": db_user}

@router.get("/users/{firebase_id}")
def get_user(firebase_id: str, db: Session = Depends(get_db)):
    user = db.query(Users).filter(Users.firebase_id == firebase_id).first()
    if user is None:
        return {"message": "User not found"}
    user_interests = db.query(FieldOfInterest).filter(FieldOfInterest.user_id == user.id).all()
    user_data = {
        "id": user.id,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
        "firebase_id": user.firebase_id,
        "engineering_discipline": user.engineering_discipline,
        "field_of_interest": [interest.name for interest in user_interests]
    }
    return user_data

# Fetch questions by category with an optional limit
@router.get("/questions/{category}", response_model=list[Question])
def get_questions_by_category_endpoint(
    category: str,
    limit: int = 10,  
    db: Session = Depends(get_db),
):
    """
    Fetch questions under a specific category with an optional limit.
    """
    # questions = db.query(Question).filter(Question.category == category).limit(limit).all()
    questions = get_questions_by_category(db, category)
    if not questions:
        raise HTTPException(status_code=404, detail="No questions found for this category")
    return questions
