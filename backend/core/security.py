from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadSignature
from fastapi import HTTPException, Depends, Request
from .config import Config
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta, datetime
from sqlalchemy.orm import Session
from core.database import get_db
from models.crud import get_user
from models.user import UserData
from cryptography.fernet import Fernet, InvalidToken
from core.logger import logger
from .utils import get_current_session
from .common import s

API_SECRET_KEY = Config.API_SECRET_KEY


# def get_token_from_cookie(request: Request):
#     try:
#         print(request)
#         token = request.cookies.get("access_token")
#         if not token:
#             raise HTTPException(
#                 status_code=401, detail="Authentication token is missing"
#             )
#         return token
#     except Exception as e:
#         logger.error("An error occurred: function: get_token_from_cookie", exc_info=1)
#         logger.info("Token type:", type(token))
#         logger.info("Cookies: ", request.cookies)


# def get_current_user(
#     token: str = Depends(get_token_from_cookie),
#     db: Session = Depends(get_db),
# ) -> UserData:
#     try:
#         payload = s.loads(token)
#         user_id = payload["user_id"]
#         user = get_user(db, user_id=user_id)
#         print(f"User object: {user}")  # Debug print
#         if user is None:
#             raise HTTPException(status_code=400, detail="User not found")
#         return user
#     except (BadSignature, SignatureExpired, Exception) as e:
#         print("Error at get_current: ", e)
#         print("Token type:", type(token))
#         print("DB session type:", type(db))
#         raise HTTPException(status_code=400, detail="Invalid or expired token")


def get_user_api_key(
    db: str = Depends(get_db),
    token_data: dict = Depends(
        get_current_session
    ),  # token_data because get_current_session returns the data
) -> str:
    try:
        user_id = token_data.get("user_id", None)
        # user_id = token_data["user_id"]
        user = get_user(db, user_id=user_id)

        if not user or not user.api_key:
            raise HTTPException(status_code=400, detail="No API key found for the user")

        # Decrypt API key
        cipher_suite = Fernet(API_SECRET_KEY.encode())
        decrypted_api_key = cipher_suite.decrypt(
            user.api_key.encode("utf-8"), ttl=60 * 60 * 24 * 30
        ).decode()

        return decrypted_api_key

    except InvalidToken as t:  # Catch this before generic Exception
        print("Invalid Token:", t)
        raise HTTPException(status_code=400, detail="Invalid or expired API key")

    except Exception as e:
        print("An error occurred in get_user_api_key:", e)
        raise HTTPException(status_code=400, detail="An error occurred")


def create_email_verification_token(email: str):
    return s.dumps({"verify_email": email})


def create_password_reset_token(email: str):
    return s.dumps({"reset_password": email})


def create_access_token(user_id: int, duration: timedelta):
    expiry = datetime.utcnow() + duration
    return s.dumps({"user_id": user_id, "exp": expiry.timestamp()})


def create_refresh_token(user_id: int, duration: timedelta):
    expiry = datetime.utcnow() + duration
    return s.dumps({"user_id": user_id, "exp": expiry.timestamp(), "type": "refresh"})


def verify_email_token(token: str):
    try:
        data = s.loads(token, max_age=86400)  # max_age: 24 hours in seconds
        return data.get("verify_email")
    except Exception as e:
        logger.exception("Error verifying email token", e)
        return None


def verify_password_reset_token(token: str):
    try:
        data = s.loads(token, max_age=3600)  # max_age: 1 hour in seconds
        return data.get("reset_password")
    except SignatureExpired:
        print("Token has expired!")
        return None
    except BadSignature:
        print("Token is invalid!")
        return None


def verify_password(stored_password, provided_password):
    return check_password_hash(stored_password, provided_password)


def verify_token(token: str, token_type: str = "access"):
    data = s.loads(token)
    if "exp" in data and datetime.utcnow().timestamp() > data["exp"]:
        raise HTTPException(status_code=401, detail="Token has expired")
    if token_type == "refresh" and data.get("type") != "refresh":
        raise HTTPException(status_code=401, detail="Invalid token type")
    return data["user_id"]


def get_password_hash(password):
    return generate_password_hash(password)
