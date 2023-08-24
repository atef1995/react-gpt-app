from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    create_engine,
    Boolean,
    DateTime,
)
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from core.config import Config
import datetime

Base = declarative_base()
engine = create_engine(Config.DATABASE_URL)


class UserData(Base):
    __tablename__ = "user_data"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, index=True, unique=True)
    hashed_password = Column(String)
    is_verified = Column(Boolean, default=False)
    verification_token = Column(String, index=True)
    password_reset_token = Column(String, index=True)
    model_choice = Column(String, index=True)
    api_key = Column(String)


Base.metadata.create_all(bind=engine)
