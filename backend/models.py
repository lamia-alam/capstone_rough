from sqlalchemy import Column, Integer, String
from database import Base
from sqlalchemy.types import Enum
import enum
from sqlalchemy.orm import relationship
from sqlalchemy.orm import Mapped
from sqlalchemy import ForeignKey
from typing import List


class EngineeringDisciplineEnum(enum.Enum):
        SOFTWARE = "Software"
        ELECTRICAL = "Electrical"
        MECHANICAL = "Mechanical"
        CIVIL = "Civil"
        COMPUTER = "Computer"
        CHEMICAL = "Chemical"
        INDUSTRIAL = "Industrial"


class Users(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, index=True)
    last_name = Column(String, index=True)
    email = Column(String, index=True)
    firebase_id = Column(String, unique=True, index=True)
    engineering_discipline = Column(Enum(EngineeringDisciplineEnum), index=True)
    field_of_interest: Mapped[List["FieldOfInterest"]] = relationship()

class FieldOfInterest(Base):
    __tablename__ = "field_of_interest"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    user_id: Mapped[int] = Column(Integer, ForeignKey('users.id'), nullable=False)

    user = relationship("Users", back_populates="field_of_interest")

class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)  # Unique identifier for each question
    category = Column(String, nullable=False, index=True)  # Category name (must always be provided)
    question_text = Column(String, nullable=False, unique=True)  # Question text (must be unique)

    def __repr__(self):
        return f"<Question(id={self.id}, category='{self.category}', question_text='{self.question_text}')>"




