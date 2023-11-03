# routes/pdf_routes.py
import os
from fastapi import Depends
from models.user import UserData
from core.database import Session, get_db
from core.security import (
    get_user_api_key,
    API_SECRET_KEY,
)
from core.utils import get_current_user
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Body
from services import pdf_service
import shutil
from typing import Optional, List, Union
from cryptography.fernet import Fernet
from pydantic import BaseModel
from core.logger import logger


class QuestionModel(BaseModel):
    question: str
    section: Optional[int] = None


router = APIRouter()

# List of expert-crafted prompts
expert_prompts = {
    "write": [
        "Write a code using Python to solve a specific problem.",
        "Write a JavaScript function for a front-end feature.",
        "Write a SQL query to fetch data from a database.",
    ],
    "code": [
        "Code a simple game using Python.",
        "Code a REST API using Node.js.",
        "Code a data analysis script using Python libraries like Pandas.",
    ],
    # Add more prompts here
}


@router.post("/set-api-key/")
async def set_api_key(
    api_key: str = Body(...),
    db: Session = Depends(get_db),
    current_user: UserData = Depends(get_current_user),
):
    # Encrypt the API key
    cipher_suite = Fernet(API_SECRET_KEY.encode())
    encrypted_api_key_bytes = cipher_suite.encrypt(api_key.encode())

    # Decode it as UTF-8 to store as a string in the database
    encrypted_api_key_str = encrypted_api_key_bytes.decode("utf-8")

    # Update the user record in the database
    current_user.api_key = encrypted_api_key_str
    db.add(current_user)
    db.commit()

    return {"detail": "API key set successfully"}


@router.post("/upload/")
async def upload_pdf(
    file: Optional[UploadFile] = File(None),
    model_choice: str = Form(...),  # You can get the model choice via a form field
    db: Session = Depends(get_db),
    current_user: UserData = Depends(get_current_user),
):
    print("Uploading...")
    if file:
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

        current_user.file_path = file_path
        print("added file path" + current_user.file_path)

    current_user.model_choice = model_choice
    db.commit()
    # context = pdf_service.extract_text_from_pdf(file_path)
    return {"status": "success"}


@router.get("/get-suggestions", response_model=Union[List[str], str])
async def get_suggestions(q: str = ""):
    query_words = set(q.lower().split())
    suggestions = []

    for key in expert_prompts.keys():
        if key in query_words:
            suggestions.extend(expert_prompts[key])

    if not suggestions:
        return "No suggestions available."

    return list(set(suggestions))  # Remove duplicates if any


@router.post("/ask/")
async def ask_question(
    payload: QuestionModel,
    current_user: UserData = Depends(get_current_user),
    # api_key: str = Depends(get_user_api_key),
):
    try:
        api_key = current_user.api_key
        question = payload.question
        # Retrieve the file path and extract the appropriate context
        file_path = current_user.file_path
        print("gpt:", current_user.model_choice)
        print("file path:", file_path)

        args = {"question": question, "api_key": api_key}

        if file_path is not None:
            # raise HTTPException(status_code=400, detail="File path is not set")
            context = pdf_service.extract_text_from_pdf(file_path)
            print("context", context)
            if context is None:
                raise HTTPException(
                    status_code=400, detail="Failed to extract text from PDF"
                )
            args["context"] = context

        # Ask the question
        if current_user.model_choice == "gpt-3":
            response = pdf_service.generate_with_gpt3(**args)
        elif current_user.model_choice == "gpt-4":
            response = pdf_service.generate_with_gpt4(**args)
        else:
            raise HTTPException(status_code=400, detail="Invalid model choice")
    except Exception as e:
        logger.error(f"Failed to generate response: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate response")

    return {"response": response}
