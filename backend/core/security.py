from itsdangerous import URLSafeTimedSerializer
from .config import Config
from werkzeug.security import generate_password_hash, check_password_hash

s = URLSafeTimedSerializer(Config.SECRET_KEY)


def create_session(user_id: int):
    return s.dumps({"user_id": user_id}).decode("utf-8")


def verify_password(stored_password, provided_password):
    return check_password_hash(stored_password, provided_password)


def get_password_hash(password):
    return generate_password_hash(password)
