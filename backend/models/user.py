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
    document = Column(String, nullable=True)
    is_verified = Column(Boolean, default=False)
    verification_token = Column(String, index=True)
    password_reset_token = Column(String, index=True)
    refresh_tokens = relationship("RefreshToken", back_populates="user")


class RefreshToken(Base):
    __tablename__ = "refresh_tokens"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user_data.id"), nullable=False)
    token = Column(String, unique=True, index=True, nullable=False)
    expires_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("UserData", back_populates="refresh_tokens")


Base.metadata.create_all(bind=engine)
