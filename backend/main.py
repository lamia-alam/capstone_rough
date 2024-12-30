from fastapi import FastAPI, Depends
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Users, FieldOfInterest
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",  # Your React app's origin
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}


class User(BaseModel):
    first_name: str
    last_name: str
    email: str
    firebase_id: str
    engineering_discipline: str
    field_of_interest: list[str]

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/create_user")
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