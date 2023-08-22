from fastapi import FastAPI
from .routes import pdf_routes
from .routes import authentication
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "http://localhost:3000",  # React's default port
    # add any other origins you need to allow requests from
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
