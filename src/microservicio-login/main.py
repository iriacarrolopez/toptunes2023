from typing import Optional
from fastapi import Depends, FastAPI, HTTPException
from fastapi.openapi.models import OAuthFlows
from fastapi.openapi.models import OAuthFlowAuthorizationCode
from pydantic import BaseModel
import mysql.connector
from typing import List

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

oauth_flows = OAuthFlows(
    authorizationCode=OAuthFlowAuthorizationCode(
        authorizationUrl="token",
        tokenUrl="token",
        refreshUrl="token",
        scopes={
            "read:users": "Read Users",
            "write:users": "Write Users",
        },
    )
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# Configuración de la base de datos MySQL
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "deusto",
    "database": "spotify2023"
}

# Clase modelo para el usuario
class User(BaseModel):
    name: str
    email: str
    password: str

# Modelo de la base de datos para usuarios
class UserDB(BaseModel):
    id: int
    name: str
    email: str

class LoginData(BaseModel):
    username: str
    password: str

@app.post("/registro/", response_model=UserDB)
async def register(user: User):
    try:
        # Conexión a la base de datos
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Verificar si el usuario ya existe
        cursor.execute("SELECT * FROM usuarios WHERE email = %s", (user.email,))
        existing_user = cursor.fetchone()

        if existing_user:
            raise HTTPException(status_code=400, detail="El usuario ya existe")

        # Insertar el nuevo usuario en la base de datos
        insert_query = "INSERT INTO usuarios (nombre, email, password) VALUES (%s, %s, %s)"
        cursor.execute(insert_query, (user.name, user.email, user.password))
        conn.commit()

        # Obtener el ID del usuario recién registrado
        cursor.execute("SELECT LAST_INSERT_ID()")
        user_id = cursor.fetchone()[0]

        conn.close()

        return {"id": user_id, "name": user.name, "email": user.email}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    
@app.post("/login/")
async def login(data: LoginData):
    try:
        # Conexión a la base de datos
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Verificar si el usuario existe y coincide con la contraseña
        cursor.execute("SELECT * FROM usuarios WHERE nombre = %s AND password = %s", (data.username, data.password))
        db_user = cursor.fetchone()

        if db_user:
            return {"message": "Inicio de sesión exitoso"}
        else:
            raise HTTPException(status_code=401, detail="Credenciales inválidas")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()

@app.get("/mostrar_usuarios/", response_model=List[UserDB])
async def get_users():
    try:
        # Conexión a la base de datos
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Obtener todos los usuarios de la base de datos
        cursor.execute("SELECT id, nombre, email FROM usuarios")
        users = [{"id": user[0], "name": user[1], "email": user[2]} for user in cursor.fetchall()]

        conn.close()

        return users
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="::", port=8000, reload=True)