# routes/pdf_routes.py
import os
from fastapi import Depends
from models.user import UserData
from core.database import or_, Session, get_db
from core.security import get_current_user
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Body
from services import pdf_service
import shutil
from typing import Optional
from cryptography.fernet import Fernet

router = APIRouter()
SECRET_KEY = Fernet.generate_key()


@router.post("/set-api-key/")
async def set_api_key(
    api_key: str = Body(...),
    db: Session = Depends(get_db),
    current_user: UserData = Depends(get_current_user),
):
    cipher_suite = Fernet(SECRET_KEY)
    encrypted_api_key = cipher_suite.encrypt(api_key.encode())

    current_user.api_key = encrypted_api_key
    db.commit()

    return {"detail": "API key set successfully"}


@router.post("/upload/")
async def upload_pdf(
    file: UploadFile = File(...),
    model_choice: str = Form(...),  # You can get the model choice via a form field
    db: Session = Depends(get_db),
    current_user: UserData = Depends(get_current_user),
):
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

    context = pdf_service.extract_text_from_pdf(file_path)
    return {
        "status": "success"
    }  # You might return a status or some information about the extracted text


# ask page
@router.post("/ask/")
async def ask_question(
    question: str,
    section: Optional[
        int
    ] = None,  # This could be used to specify a particular section of the document
    db: Session = Depends(get_db),
    current_user: UserData = Depends(get_current_user),
):
    # Retrieve the file path and extract the appropriate context
    file_path = current_user.file_path
    context = pdf_service.get_context_from_file(file_path, section)

    # Make sure the context is within the token limit, if needed
    model_choice_gpt3 = (
        db.query(UserData).filter(UserData.model_choice == "gpt-3").first()
    )
    model_choice_gpt4 = (
        db.query(UserData).filter(UserData.model_choice == "gpt-4").first()
    )

    # Ask the question
    if model_choice_gpt3:
        response = pdf_service.generate_with_gpt3(context, question)

    elif model_choice_gpt4:
        response = pdf_service.generate_with_gpt3(context, question)

    return {"response": response}
