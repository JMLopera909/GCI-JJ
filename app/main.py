from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.database import engine, Base, SessionLocal
from app.models.roles_model import Rol
import app.models

from app.routes.auth_routes import router as auth_router

app = FastAPI()

# Crea las tablas si aún no existen
Base.metadata.create_all(bind=engine)

# Sembrado inicial de roles requeridos por el registro
def seed_roles():
    db = SessionLocal()
    try:
        admin_role = db.query(Rol).filter(Rol.id == 1).first()
        patient_role = db.query(Rol).filter(Rol.id == 2).first()

        if not admin_role:
            db.add(Rol(id=1, nombre_rol='Admin'))

        if not patient_role:
            db.add(Rol(id=2, nombre_rol='Paciente'))

        if not admin_role or not patient_role:
            db.commit()
    finally:
        db.close()

seed_roles()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*"]
)

app.include_router(auth_router)

app.mount("/", StaticFiles(directory="static", html=True), name="static")