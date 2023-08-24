# from core.database import SessionLocal  # Adjust the import based on your setup
# import datetime


# def store_refresh_token(user_id: int, token: str, expires_at: datetime.datetime):
#     db_session = SessionLocal()
#     db_token = RefreshToken(user_id=user_id, token=token, expires_at=expires_at)
#     db_session.add(db_token)
#     db_session.commit()
#     db_session.close()


# def invalidate_refresh_token_for_user(user_id: int):
#     db_session = SessionLocal()
#     db_session.query(RefreshToken).filter(RefreshToken.user_id == user_id).delete()
#     db_session.commit()
#     db_session.close()


# def verify_and_get_user_from_refresh_token(token: str):
#     db_session = SessionLocal()
#     db_token = (
#         db_session.query(RefreshToken).filter(RefreshToken.token == token).first()
#     )
#     db_session.close()

#     if db_token and db_token.expires_at > datetime.datetime.utcnow():
#         return db_token.user
#     return None
