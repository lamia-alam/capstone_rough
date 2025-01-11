from database import Base, engine
from models import Users, FieldOfInterest, EngineeringDisciplineEnum, Question

Base.metadata.create_all(bind=engine)