from fastapi import FastAPI
from .routes import pdf_routes
from .routes import authentication
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "http://18.159.235.178",
    # add any other origins you need to allow requests from
    "http://192.168.1.233:3000",
    "http://127.0.0.1",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(authentication.router)

app.include_router(pdf_routes.router)

# i dont know if i need this
# , prefix="/pdf", tags=["pdf"]
