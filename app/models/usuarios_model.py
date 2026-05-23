from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Date
from app.database import Base

class Usuario(Base):
    __tablename__ = "usuarios"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    primer_apellido = Column(String, nullable=False)
    segundo_apellido = Column(String)
    tipo_documento = Column(String, nullable=False)
    documento = Column(String, unique=True, nullable=False)
    telefono = Column(String)
    fecha_nacimiento = Column(Date)
    correo = Column(String, unique=True, nullable=False)
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    rol_id = Column(Integer, ForeignKey("roles.id"))
    activo = Column(Boolean, default=True)