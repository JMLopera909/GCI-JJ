from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os


# Carga variables del .env
load_dotenv()


# Obtiene la URL de conexión
DATABASE_URL = os.getenv("DATABASE_URL")


# Motor de conexión
engine = create_engine(DATABASE_URL)


# Sesión de base de datos
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


# Base para modelos
Base = declarative_base()

def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()