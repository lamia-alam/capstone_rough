from sqlalchemy import Column, Integer, String
from database import Base
from sqlalchemy.types import Enum
import enum
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey


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
    firebase_id = Column(String, unique=True, index=True)
    engineering_discipline = Column(Enum(EngineeringDisciplineEnum), index=True)

class FieldOfInterest(Base):
    __tablename__ = "field_of_interest"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))

    user = relationship("Users", back_populates="fields_of_interest")


Users.fields_of_interest = relationship("FieldOfInterest", back_populates="users")

