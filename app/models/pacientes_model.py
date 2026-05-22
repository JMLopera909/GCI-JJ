from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from app.database import Base

class Paciente(Base):
    __tablename__ = "pacientes"
    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))
    paciente_afiliado = Column(Boolean, default=False)
    cantidad_inasistencias = Column(Integer, default=0)
    bloqueado = Column(Boolean, default=False)