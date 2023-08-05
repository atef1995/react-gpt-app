from .config import s
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import HTTPException, Depends
from itsdangerous import (
    URLSafeTimedSerializer as Serializer,
    BadSignature,
    SignatureExpired,
)


def create_session(user_id: int):
    return s.dumps({"user_id": user_id}).decode("utf-8")


def get_current_session(
    authorization: HTTPAuthorizationCredentials = Depends(HTTPBearer()),
):
    try:
        data = s.loads(authorization.credentials)
        return data
    except (BadSignature, SignatureExpired):
        raise HTTPException(status_code=400, detail="Invalid or expired session")
