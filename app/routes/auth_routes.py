from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session

from app.database import get_db

from app.models.usuarios_model import Usuario
from app.models.pacientes_model import Paciente

from app.schemas.usuario_schema import UsuarioCreate, UsuarioResponse


router = APIRouter()

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