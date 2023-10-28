from fastapi import FastAPI
from .routes import pdf_routes
from .routes import authentication
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "http://18.159.235.178",
    "http://18.159.51.170",
    "http://18.184.24.8",
    "http://18.156.155.238",
    "http://backendBalancer-614402920.eu-central-1.elb.amazonaws.com",
    "http://frontendl-463996173.eu-central-1.elb.amazonaws.com",
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
