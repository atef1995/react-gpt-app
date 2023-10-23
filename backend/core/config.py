from cryptography.fernet import Fernet
import os


class Config:
    SECRET_KEY = "your_secret_key"
    EXPIRE_MINUTES = 60
    DATABASE_URL = "sqlite:///./app.db"
    API_SECRET_KEY = os.environ.get("API_SECRET_KEY", Fernet.generate_key().decode())


class EmailConfig:
    SMTP_SERVER = "sandbox.smtp.mailtrap.io"
    SMTP_PORT = 2525  # Use the appropriate port for your SMTP server
    SMTP_USERNAME = "fc855ba96003fe"
    SMTP_PASSWORD = "bcfc7561bad124"
    SMTP_FROM_EMAIL = "from@example.com"
