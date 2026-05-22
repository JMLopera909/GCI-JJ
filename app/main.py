from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import app.models

from app.routes.auth_routes import router as auth_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*"]
)

app.include_router(auth_router)