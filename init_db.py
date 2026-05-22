from app.database import engine, Base

from app.models.roles_model import Rol
from app.models.usuarios_model import Usuario
from app.models.pacientes_model import Paciente


Base.metadata.create_all(bind=engine)

print("Tablas creadas correctamente")