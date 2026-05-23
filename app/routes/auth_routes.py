from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import or_

from sqlalchemy.orm import Session

from app.database import get_db

from app.models.usuarios_model import Usuario
from app.models.pacientes_model import Paciente

from app.schemas.usuario_schema import UsuarioCreate, UsuarioResponse, LoginRequest


router = APIRouter()

@router.post("/login", response_model=UsuarioResponse)
def login_usuario(
    login: LoginRequest,
    db: Session = Depends(get_db)
):
    usuario = db.query(Usuario).filter(
        or_(Usuario.username == login.username, Usuario.correo == login.username),
        Usuario.password == login.password
    ).first()

    if not usuario:
        raise HTTPException(
            status_code=401,
            detail="Usuario o contraseña incorrectos"
        )

    return usuario


@router.post("/registro", response_model=UsuarioResponse)

def registrar_usuario(
    usuario: UsuarioCreate,
    db: Session = Depends(get_db)
):

    usuario_existente = db.query(Usuario).filter(
        Usuario.correo == usuario.correo
    ).first()

    if usuario_existente:

        raise HTTPException(
            status_code=400,
            detail="El correo ya está registrado"
        )

    nuevo_usuario = Usuario(

        nombre=usuario.nombre,

        primer_apellido=usuario.primer_apellido,

        segundo_apellido=usuario.segundo_apellido,

        tipo_documento=usuario.tipo_documento,

        documento=usuario.documento,

        telefono=usuario.telefono,

        fecha_nacimiento=usuario.fecha_nacimiento,

        correo=usuario.correo,

        username=usuario.username,

        password=usuario.password,

        rol_id=2
    )

    db.add(nuevo_usuario)

    db.commit()

    db.refresh(nuevo_usuario)

    nuevo_paciente = Paciente(

        usuario_id=nuevo_usuario.id,

        paciente_afiliado=False,

        cantidad_inasistencias=0,

        bloqueado=False
    )

    db.add(nuevo_paciente)

    db.commit()

    return nuevo_usuario