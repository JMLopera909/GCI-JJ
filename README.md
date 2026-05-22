# GCI-JJ

Aplicación web de gestión clínica enfocada en registro de pacientes, inicio de sesión y un dashboard de paciente cargado desde una API.

## Tecnologías utilizadas

* Python 3.12
* FastAPI
* SQLAlchemy
* PostgreSQL
* Pydantic
* Uvicorn
* Docker
* Docker Compose
* HTML5 + Tailwind CSS (frontend estático)
* JavaScript del lado del cliente

## Descripción del proyecto

GCI-JJ es una aplicación en desarrollo que provee:

* Registro de nuevos pacientes con almacenamiento en base de datos
* Inicio de sesión de usuarios
* Dashboard de paciente protegido que carga datos desde el frontend mediante `localStorage`
* Servicios REST básicos para `login` y `registro`
* Servidor estático integrado con FastAPI para las páginas HTML y JS

## Estado actual

La aplicación ya dispone de:

* `app/main.py` - FastAPI con CORS, router de autenticación y montaje de archivos estáticos
* `app/routes/auth_routes.py` - endpoints `/login` y `/registro`
* `app/database.py` - conexión a PostgreSQL usando `DATABASE_URL`
* `app/models/usuarios_model.py` y `app/models/pacientes_model.py` - modelos SQLAlchemy
* `app/schemas/usuario_schema.py` - validación de datos con Pydantic
* Frontend estático en `static/` con:
  * `index.html` - login
  * `dashboard.html` - vista protegida de paciente
  * `Rpacientes.html` - formulario de registro
  * `js/login.js`, `js/dashboard.js`, `js/register.js`

## Funcionalidades principales

* Registro de usuario/paciente
* Inicio de sesión con nombre de usuario o correo
* Dashboard con datos de paciente presentados en la interfaz
* Logout que limpia la sesión local y redirige al login
* Soporte Docker para levantar backend y PostgreSQL

## Estructura del proyecto

```
app/
  database.py
  main.py
  models/
    pacientes_model.py
    roles_model.py
    usuarios_model.py
  routes/
    auth_routes.py
  schemas/
    usuario_schema.py
static/
  index.html
  dashboard.html
  Rpacientes.html
  js/
    login.js
    dashboard.js
    register.js
dockerfile
docker-compose.yml
requirements.txt
README.md
```

## Endpoints disponibles

* `POST /login` - autenticación de usuario
* `POST /registro` - creación de usuario/paciente
* `GET /` - sirve el frontend estático desde `static/`

## Variables de entorno

* `DATABASE_URL` - URL de conexión a PostgreSQL

Ejemplo de valor:

```bash
postgresql://admin:admin123@postgres:5432/gci_jj_db
```

## Uso con Docker

1. Construir y levantar servicios:

```bash
docker-compose up --build
```

2. El backend queda expuesto en `http://localhost:8085`
3. PostgreSQL queda disponible en `localhost:5433` con credenciales:
   * usuario: `admin`
   * contraseña: `admin123`
   * base: `gci_jj_db`

## Uso local sin Docker

1. Crear un entorno virtual Python.
2. Instalar dependencias:

```bash
pip install -r requirements.txt
```

3. Configurar `DATABASE_URL`.
4. Ejecutar:

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8085
```

## Notas importantes

* Actualmente las contraseñas se almacenan en texto plano en la base de datos, por lo que no está listo para producción.
* El dashboard usa datos guardados en `localStorage`; la sesión se maneja del lado cliente.
* El proyecto está en desarrollo y continuará mejorando la validación de formularios, seguridad de autenticación y manejo de roles.

## Autor

Juan Manuel Lopera Henao

Estudiante de Ingeniería de Sistemas con interés en desarrollo backend y aplicaciones web.
