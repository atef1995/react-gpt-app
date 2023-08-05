from fastapi import APIRouter

router = APIRouter()


@router.get("/some_path/")
def some_function():
    return {"message": "Hello"}
