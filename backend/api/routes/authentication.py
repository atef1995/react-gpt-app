from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from core.security import verify_password, get_password_hash, create_session
from core.database import SessionLocal
from models.user import UserData
import logging
from pydantic import BaseModel


class RegisterPayload(BaseModel):
    username: str
    password: str


router = APIRouter()


@router.post("/register/")
def register(payload: RegisterPayload):
    logging.info(f"Received payload: {payload.dict()}")
    db_session = SessionLocal()
    user = db_session.query(UserData).filter_by(username=payload.username).first()
    if user:
        raise HTTPException(status_code=400, detail="Username already exists.")
    hashed_password = get_password_hash(payload.password)
    new_user = UserData(username=payload.username, hashed_password=hashed_password)
    db_session.add(new_user)
    db_session.commit()
    db_session.close()
    return {"message": "User created"}


@router.post("/login/")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    db_session = SessionLocal()
    user = db_session.query(UserData).filter_by(username=form_data.username).first()
    if not user or not verify_password(user.hashed_password, form_data.password):
        raise HTTPException(status_code=401, detail="Incorrect credentials")
    access_token = create_session(user.id)
    return {"access_token": access_token, "token_type": "bearer"}
