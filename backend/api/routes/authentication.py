from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from core.security import (
    verify_password,
    get_password_hash,
    create_session,
    create_email_verification_token,
    verify_email_token,
    create_password_reset_token,
)
from core.database import SessionLocal, or_, Session, get_db
from models.user import UserData
from core.email_util import send_email
import logging
from pydantic import BaseModel


class RegisterPayload(BaseModel):
    username: str
    email: str
    password: str


router = APIRouter()


@router.post("/register/")
def register(payload: RegisterPayload, db: Session = Depends(get_db)):
    logging.info(f"Received payload: {payload.dict()}")
    user = (
        db.query(UserData)
        .filter(
            or_(UserData.username == payload.username, UserData.email == payload.email)
        )
        .first()
    )
    if user:
        raise HTTPException(status_code=400, detail="Username or email already exists.")
    hashed_password = get_password_hash(payload.password)
    verification_token = create_email_verification_token(payload.email)
    new_user = UserData(
        username=payload.username, email=payload.email, hashed_password=hashed_password
    )
    verification_link = (
        f"https://yourfrontenddomain.com/verify-email?token={verification_token}"
    )
    db.add(new_user)
    db.commit()
    send_email(
        "Verify your email address",
        f"Click here to verify your email address: {verification_link}",
        payload.email,
    )
    return {"message": "User created"}


@router.get("/verify/{token}/")
def verify(token: str, db: Session = Depends(get_db)):
    email = verify_email_token(token)
    if not email:
        raise HTTPException(status_code=400, detail="Invalid or expired token.")
    user = db.query(UserData).filter(UserData.email == email).first()
    if not user:
        raise HTTPException(status_code=400, detail="User not found.")
    user.is_verified = True
    db.commit()
    return {"message": "Email verified successfully"}


@router.post("/login/")
def login(
    db: Session = Depends(get_db),
    form_data: OAuth2PasswordRequestForm = Depends(),
):
    print("login reached")
    user = db.query(UserData).filter(UserData.username == form_data.username).first()
    if not user or not verify_password(user.hashed_password, form_data.password):
        raise HTTPException(status_code=401, detail="Incorrect credentials")
    access_token = create_session(user.id)
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/forgot-password/")
def forgot_password(email: str, db: Session = Depends(get_db)):
    user = db.query(UserData).filter(UserData.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    reset_token = create_password_reset_token(email)
    verification_link = (
        f"https://yourfrontenddomain.com/reset-password?token={reset_token}"
    )
    send_email(
        subject="Password Reset",
        body=f"Click here to verify your email address: {verification_link}",
        email=email,
    )

    return {"message": "Password reset email sent"}
