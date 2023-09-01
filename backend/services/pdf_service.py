# services/pdf_service.py

import openai
from pdfminer.high_level import extract_text
from core.security import get_user_api_key
from fastapi import HTTPException
from core.logger import logger


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
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": f"{context}"},
            {"role": "user", "content": f"{question}"},
        ],
        max_tokens=max_tokens,
    )
    return response["choices"][0]["message"]["content"].strip()


def generate_with_gpt4(
    context: str,
    question: str,
    api_key: str,
    max_tokens: int = 2048,
) -> str:
    try:
        openai.api_key = api_key
        # Assuming gpt-4 would also use Chat API
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": f"{context}"},
                {"role": "user", "content": f"{question}"},
            ],
            max_tokens=max_tokens,
        )
        return response["choices"][0]["message"]["content"].strip()
    except Exception as e:
        logger.error(e)
        return HTTPException(
            status_code=400, detail="Something went wrong, check your api key"
        )


def generate_summary_with_gpt4(
    context: str, api_key: str, max_tokens: int = 150
) -> str:
    openai.api_key = api_key
    response = openai.Completion.create(
        model="gpt-4",
        prompt=f"Please summarize the following text:\n\n{context}\n\nSummary:",
        max_tokens=max_tokens,
    )
    print(response)
    return response.choices[0].text.strip()
