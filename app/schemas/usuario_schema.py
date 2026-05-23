from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date


class UsuarioCreate(BaseModel):
    nombre: str
    primer_apellido: str
    segundo_apellido: Optional[str] = None
    tipo_documento: str
    documento: str
    telefono: Optional[str] = None
    fecha_nacimiento: Optional[date] = None
    correo: EmailStr
    username: str
    password: str


class LoginRequest(BaseModel):
    username: str
    password: str


class UsuarioResponse(BaseModel):
    id: int
    nombre: str
    primer_apellido: str
    segundo_apellido: Optional[str] = None
    tipo_documento: str
    documento: str
    telefono: Optional[str] = None
    fecha_nacimiento: Optional[date] = None
    correo: EmailStr
    username: str
    activo: bool

    class Config:
        from_attributes = True