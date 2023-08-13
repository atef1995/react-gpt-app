# routes/pdf_routes.py

from fastapi import APIRouter, UploadFile, File
from services import pdf_service
import shutil

router = APIRouter()


@router.post("/upload/")
async def upload_pdf(file: UploadFile = File(...)):
    with open(f"temp_files/{file.filename}", "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    context = pdf_service.extract_text_from_pdf(f"temp_files/{file.filename}")
    return {"context": context}


@router.post("/ask/")
async def ask_question(context: str, question: str):
    response = pdf_service.generate_response(context, question)
    return {"response": response}
