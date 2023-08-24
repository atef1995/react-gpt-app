from sqlalchemy.orm import Session
from .user import UserData


def get_user(db: Session, user_id: str):
    return db.query(UserData).filter(UserData.id == user_id).first()
