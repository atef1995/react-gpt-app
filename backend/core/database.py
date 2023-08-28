from sqlalchemy import create_engine, or_
from sqlalchemy.orm import sessionmaker, Session
from .config import Config
from models.user import UserData


engine = create_engine(Config.DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)


def get_db():
    db = SessionLocal()
    print("Inside get_db, DB type: ", type(db))
    try:
        yield db
    finally:
        db.close()
