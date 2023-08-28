# services/pdf_service.py

import openai
from pdfminer.high_level import extract_text
from core.security import get_user_api_key


# print("\n\nopenai key: ", openai.api_key, "\n\n")


def extract_text_from_pdf(pdf_path: str) -> str:
    extracted_text = extract_text(pdf_path)
    return extracted_text


def generate_with_gpt3(
    context: str,
    question: str,
    api_key: str,
    max_tokens: int = 2048,
) -> str:
    openai.api_key = api_key
    response = openai.Completion.create(
        model="gpt-3.5-turbo",
        prompt=f"{context}\n\nUser: {question}\nAI:",
        max_tokens=max_tokens,
    )
    return response.choices[0].text.strip()


def generate_with_gpt4(
    context: str, question: str, api_key: str, max_tokens: int = 2048
) -> str:
    openai.api_key = api_key
    response = openai.Completion.create(
        model="gpt-4",
        prompt=f"{context}\n\nUser: {question}\nAI:",
        max_tokens=max_tokens,
    )
    return response.choices[0].text.strip()
