from fastapi import APIRouter, Depends, HTTPException, Body, Response, Request
from fastapi.security import OAuth2PasswordRequestForm
from fastapi_limiter import FastAPILimiter
from fastapi_limiter.depends import RateLimiter
import logging
from datetime import timedelta, datetime
from core.security import (
    verify_password,
    get_password_hash,
    create_access_token,
    create_refresh_token,
    create_email_verification_token,
    verify_email_token,
    create_password_reset_token,
    verify_password_reset_token,
    verify_token,
)
from api.dependencies.token_operations import (
    store_refresh_token,
    invalidate_refresh_token_for_user,
    verify_and_get_user_from_refresh_token,
)
from core.utils import get_current_session
from core.database import SessionLocal, or_, Session, get_db
from core.logger import logger
from core.email_util import send_email
from models.user import UserData, RefreshToken
from pydantic import BaseModel
from redis import asyncio as aioredis

logger.info("this is authentication")


class RegisterPayload(BaseModel):
    username: str
    email: str
    password: str


router = APIRouter()


@router.on_event("startup")
async def startup():
    # Configure it to use Redis. You can also configure it to use in-memory storage.
    redis = await aioredis.from_url("redis://redis:6379")
    await FastAPILimiter.init(redis=redis, prefix="limiter")


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
    response: Response,
    db: Session = Depends(get_db),
    form_data: OAuth2PasswordRequestForm = Depends(),
):
    user = db.query(UserData).filter(UserData.username == form_data.username).first()

    if not user:
        logger.warning(
            f"Login attempt with non-existent username: {form_data.username}"
        )
        raise HTTPException(status_code=401, detail="Incorrect credentials")

    if not verify_password(user.hashed_password, form_data.password):
        logger.warning(f"Invalid password attempt for username: {form_data.username}")
        raise HTTPException(status_code=401, detail="Incorrect credentials")

    try:
        # Set a duration for access token, e.g., 15 minutes
        access_token_expires = timedelta(minutes=15)
        access_token = create_access_token(user.id, access_token_expires)

        # Set a duration for refresh token, e.g., 1 day
        refresh_token_expires = timedelta(days=1)
        refresh_token = create_refresh_token(user.id, refresh_token_expires)

        # Calculate the exact datetime of expiration for storage
        expiration_datetime = datetime.utcnow() + refresh_token_expires
        store_refresh_token(user.id, refresh_token, expiration_datetime)

        is_secure = (
            False  # or False if you're in a development environment without HTTPS
        )

        response.set_cookie(
            key="refresh_token",
            value=refresh_token,
            httponly=True,
            domain="localhost",
            path="/",
        )

        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            domain="localhost",
            path="/",
            max_age=900,  # 15 minutes in seconds
        )

        return {
            # "access_token": access_token,
            "message": "Login successful",
            "token_type": "bearer",
            # "refresh_token": refresh_token,
        }

    except Exception as e:
        # In production, do not expose the raw error message to the client.
        # Instead, log the exception for debugging.
        logger.error(f"Error during login for username {form_data.username}: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.get("/verify-access-token/")
async def verify_access_token(request: Request, db: Session = Depends(get_db)):
    token = request.cookies.get("access_token")
    if not token:
        logger.error("Access token not found in cookies.")
        raise HTTPException(status_code=401, detail="Token not found")

    try:
        user_id = verify_token(token)
        logger.info(f"Token verified for user_id: {user_id}")
        return {"status": "Token verified", "user_id": user_id}
    except Exception as e:
        logger.error(f"Error during verifying access token. Error: {str(e)}")
        raise HTTPException(status_code=401, detail="Invalid token")


# change to serialized or databased access token
@router.post("/refresh-token")
async def refresh_token(refresh_token: str):
    user_id = verify_and_get_user_from_refresh_token(refresh_token)
    if user_id:
        # Issue a new access token
        access_token_expires = timedelta(minutes=15)
        access_token = create_access_token(user_id, access_token_expires)
    else:
        return False
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/logout/")
async def logout(current_session: dict = Depends(get_current_session)):
    user_id = current_session.get("user_id")
    if not user_id:
        raise HTTPException(status_code=400, detail="Invalid session data")

    # Invalidate the refresh token for the user.
    invalidate_refresh_token_for_user(user_id)
    return {"detail": "Logged out successfully"}


@router.post("/forgot-password/")
async def forgot_password(
    email: str,
    db: Session = Depends(get_db),
    _=Depends(RateLimiter(times=5, minutes=1)),
):
    user = db.query(UserData).filter(UserData.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user:
        reset_token = create_password_reset_token(email)
        verification_link = (
            f"http://http://localhost:3000//verify-reset-token?token={reset_token}"
        )
        send_email(
            subject="Password Reset",
            body=f"Click here to verify your email address: {verification_link}",
            to_email=email,
        )
    return {
        "message": "If the email address exists in our system, we've sent a reset link."
    }


@router.get("/verify-reset-token/")
def verify_reset_token(token: str):
    email = verify_password_reset_token(token)
    if email is None:
        raise HTTPException(status_code=400, detail="Invalid or expired token")

    # Token is valid, return the user's email
    return {"message": "Token verified"}


@router.post("/reset-password/")
def reset_password(
    token: str = Body(...), new_password: str = Body(...), db: Session = Depends(get_db)
):
    print("Password reset token received")
    email = verify_password_reset_token(token)
    if not token:
        raise HTTPException(status_code=400, detail="Invalid or expired token.")

    user = db.query(UserData).filter(UserData.email == email).first()
    if not user:
        raise HTTPException(status_code=400, detail="User not found.")

    hashed_password = get_password_hash(new_password)
    user.hashed_password = hashed_password
    user.password_reset_token = None
    db.commit()

    return {"message": "Password reset successfully"}
