from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Obtiene la URL de conexión
DATABASE_URL = os.getenv("DATABASE_URL")


# Motor de conexión
engine = create_engine(DATABASE_URL, pool_pre_ping=True)


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