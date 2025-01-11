import csv
from database import SessionLocal
from models import Question


def import_questions_from_csv(file_path: str):
    db: Session = SessionLocal()
    try:
        with open(file_path, mode="r", encoding="utf-8") as file:
            reader = csv.DictReader(file)
            for row in reader:
                question = Question(
                    category=row["Category"],
                    question_text=row["Question"]
                )
                db.add(question)
            db.commit()
            print("Questions imported successfully!")
    except Exception as e:
        print(f"Error importing questions: {e}")
        db.rollback()
    finally:
        db.close()

import os

if __name__ == "__main__":
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_dir, "QuestionsByCategory.csv")
    import_questions_from_csv(file_path)
