from pydantic import BaseModel

class PacienteCreate(BaseModel):
    paciente_afiliado: bool = False


class PacienteResponse(BaseModel):
    id: int
    usuario_id: int
    paciente_afiliado: bool
    numero_inasistencias: int
    bloqueado: bool

    class Config:
        from_attributes = True