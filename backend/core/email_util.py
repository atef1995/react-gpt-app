# email_utils.py

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from .config import EmailConfig


def send_email(subject, body, to_email):
    msg = MIMEMultipart()
    msg["From"] = EmailConfig.SMTP_FROM_EMAIL
    msg["To"] = to_email
    msg["Subject"] = subject

    msg.attach(MIMEText(body, "plain"))

    try:
        with smtplib.SMTP(EmailConfig.SMTP_SERVER, EmailConfig.SMTP_PORT) as server:
            server.starttls()
            server.login(EmailConfig.SMTP_USERNAME, EmailConfig.SMTP_PASSWORD)
            server.sendmail(EmailConfig.SMTP_FROM_EMAIL, to_email, msg.as_string())
        print("Email sent successfully")
    except Exception as e:
        print("Email sending failed:", str(e))
