from sqlalchemy import create_engine, or_
from sqlalchemy.orm import sessionmaker, Session
from .config import Config

engine = create_engine(Config.DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
