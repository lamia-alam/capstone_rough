from typing import List, Any
from sqlalchemy.orm import Session
from sqlalchemy.sql import func # shuffle
from models import Question
# from .schemas import QuestionCreate

def get_questions_by_category(db: Session, category: str) -> List[Any]:
    if category.lower() == "mixed":
        return db.query(Question).order_by(func.random()).limit(5).all() # LIMIT OF num of Qs 
    
    else: #specific category 
        test = db.query(Question).filter(Question.category == category).all() #mixed
        print(test)
        return test