from sqlalchemy import Column, Integer, String, create_engine, Boolean
from sqlalchemy.ext.declarative import declarative_base
from core.config import Config

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


Base.metadata.create_all(bind=engine)
