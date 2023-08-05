from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from core.config import Config

Base = declarative_base()
engine = create_engine(Config.DATABASE_URL)


class UserData(Base):
    __tablename__ = "user_data"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=True, unique=True)
    hashed_password = Column(String)
    api_key = Column(String, nullable=True)
    document = Column(String, nullable=True)


Base.metadata.create_all(bind=engine)
