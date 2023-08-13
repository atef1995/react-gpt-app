# services/pdf_service.py

import openai
from pdfminer.high_level import extract_text

openai.api_key = "YOUR_OPENAI_API_KEY"


def extract_text_from_pdf(pdf_path: str) -> str:
    return extract_text(pdf_path)


def generate_response(context: str, question: str, max_tokens: int = 2048) -> str:
    response = openai.Completion.create(
        model="gpt-3.5-turbo",
        prompt=f"{context}\n\nUser: {question}\nAI:",
        max_tokens=max_tokens,
    )
    return response.choices[0].text.strip()
