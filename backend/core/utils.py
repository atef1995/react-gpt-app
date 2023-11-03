from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import HTTPException, Depends
from itsdangerous import (
    URLSafeTimedSerializer,
    BadSignature,
    SignatureExpired,
)
from datetime import timedelta
from .config import Config
from sqlalchemy.orm import Session
from core.database import get_db
from models.user import UserData
from models.crud import get_user
from .common import s


def create_session(user_id: int, expires_in: timedelta):
    print("Creating session", user_id, expires_in)
    return s.dumps({"user_id": user_id, "exp": expires_in.total_seconds()})


from fastapi import Cookie


def get_current_session(access_token: str = Cookie(None)):
    if not access_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        data = s.loads(access_token, max_age=3600)
        return data
    except SignatureExpired:
        raise HTTPException(status_code=401, detail="Session has expired")
    except BadSignature:
        raise HTTPException(status_code=400, detail="Invalid session")
    except Exception as e:
        print("An unexpected error occurred:", e)
        raise HTTPException(status_code=400, detail="An unexpected error occurred")


# Update your get_current_user function
def get_current_user(
    db: Session = Depends(get_db),
    session_data: dict = Depends(get_current_session),
) -> UserData:
    try:
        # print("Authorization Header:", session_data)
        # print("db:", db)
        user_id = session_data.get("user_id")
        if not user_id:
            raise HTTPException(status_code=400, detail="User ID not found in session")

        user = get_user(
            db, user_id=user_id
        )  # Assuming get_user is a function that fetches a user by ID from the DB
        if not user:
            raise HTTPException(status_code=400, detail="User not found")

        return user
    except Exception as e:
        print(f"An exception occurred: {e}")
        raise HTTPException(status_code=400, detail=str(e))
