from pydantic import BaseModel, EmailStr
from typing import Optional


class UsuarioCreate(BaseModel):
    nombre: str
    primer_apellido: str
    segundo_apellido: Optional[str] = None
    tipo_documento: str
    documento: str
    telefono: Optional[str] = None
    correo: EmailStr
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
    correo: EmailStr
    username: str
    activo: bool

    class Config:
        from_attributes = True