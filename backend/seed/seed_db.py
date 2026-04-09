from db.session import Base, SessionLocal, engine
from models.models import Student
from seed.data import seed_students


def run_seed():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        if db.query(Student).count() == 0:
            for student in seed_students():
                db.add(student)
            db.commit()
    finally:
        db.close()


if __name__ == "__main__":
    run_seed()
