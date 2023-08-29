# routes/pdf_routes.py
import os
from fastapi import Depends
from models.user import UserData
from core.database import Session, get_db
from core.security import (
    get_current_user,
    get_user_api_key,
    SECRET_KEY,
)
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Body
from services import pdf_service
import shutil
from typing import Optional
from cryptography.fernet import Fernet
from pydantic import BaseModel


class QuestionModel(BaseModel):
    question: str
    section: Optional[int] = None


router = APIRouter()


@router.post("/set-api-key/")
async def set_api_key(
    api_key: str = Body(...),
    db: Session = Depends(get_db),
    current_user: UserData = Depends(get_current_user),
):
    print("setting api key" + api_key)

    # Encrypt the API key
    cipher_suite = Fernet(SECRET_KEY)
    encrypted_api_key_bytes = cipher_suite.encrypt(api_key.encode())

    # Decode it as UTF-8 to store as a string in the database
    encrypted_api_key_str = encrypted_api_key_bytes.decode("utf-8")

    # Update the user record in the database
    current_user.api_key = encrypted_api_key_str
    db.add(current_user)
    db.commit()
    print("added to api db" + current_user.api_key)

    return {"detail": "API key set successfully"}


@router.post("/upload/")
async def upload_pdf(
    file: UploadFile = File(...),
    model_choice: str = Form(...),  # You can get the model choice via a form field
    db: Session = Depends(get_db),
    current_user: UserData = Depends(get_current_user),
):
    print("Uploading...")
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400, detail="Invalid file type. Please upload a PDF."
        )

    # Ensure the directory exists
    temp_files_dir = "temp_files"
    os.makedirs(temp_files_dir, exist_ok=True)

    # Construct the full file path
    file_path = os.path.join(temp_files_dir, file.filename)

    # Write the file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Update user with file_path and model_choice
    current_user.file_path = file_path
    current_user.model_choice = model_choice
    db.commit()
    print("added file path" + current_user.file_path)
    # context = pdf_service.extract_text_from_pdf(file_path)
    return {"status": "success"}


@router.post("/ask/")
async def ask_question(
    payload: QuestionModel,
    current_user: UserData = Depends(get_current_user),
    api_key: str = Depends(get_user_api_key),
):
    question = payload.question
    # Retrieve the file path and extract the appropriate context
    file_path = current_user.file_path
    print(file_path)
    if file_path is None:
        raise HTTPException(status_code=400, detail="File path is not set")

    context = pdf_service.extract_text_from_pdf(file_path)
    if context is None:
        raise HTTPException(status_code=400, detail="Failed to extract text from PDF")
    # print(current_user.__dict__)
    # Get the user's API key
    print("api key in" + api_key)

    # Ask the question
    if current_user.model_choice == "gpt-3":
        response = pdf_service.generate_with_gpt3(context, question, api_key=api_key)
    elif current_user.model_choice == "gpt-4":
        response = pdf_service.generate_with_gpt4(context, question, api_key=api_key)
    else:
        raise HTTPException(status_code=400, detail="Invalid model choice")

    return {"response": response}
