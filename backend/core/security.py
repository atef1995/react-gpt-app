from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadSignature
from fastapi import HTTPException
from .config import Config
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta, datetime

s = URLSafeTimedSerializer(Config.SECRET_KEY)


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
    except:
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
