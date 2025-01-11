from fastapi import FastAPI
# from pydantic import BaseModel
# from typing import Optional
# from sqlalchemy.orm import Session
# from database import SessionLocal
# from models import Users, FieldOfInterest
from fastapi.middleware.cors import CORSMiddleware
from routes import router
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

app.include_router(router)
