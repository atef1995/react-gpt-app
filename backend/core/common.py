from itsdangerous import URLSafeTimedSerializer
from .config import Config

s = URLSafeTimedSerializer(Config.SECRET_KEY)
