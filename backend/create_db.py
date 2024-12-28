from database import Base, engine
from models import Users, FieldOfInterest, EngineeringDisciplineEnum

Base.metadata.create_all(bind=engine)