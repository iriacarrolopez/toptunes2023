0) Software que se necesita instalar
   - Microservicio en Node.js con base de datos en MongoDB
     - Este microservicio es el encargado de gestionar toda la información relacionada con las canciones.
     - Para ello necesitaremos tener instalado Node.js y MongoDB en el sistema.
   - Microservicio en FastApi con base de datos en MySQL
     - Este microservicio es el encargado de gestionar toda la información relacionada con el login y los usuarios.
     - Para ello necesitaremos tener instalado Python y FastApi en el sistema.
   - Servidor web en react
     - Servidor web utilizado para contruir la interfaz de usuario.
     - Para ello necesitaremos tener instalado Node.js
1) Servicios que hay que arrancar
   - Microservicio en Node.js con base de datos en MongoDB
     - Arrancar la base de datos en MongoDB, para ello en la consola navegaremos hasta la carpeta de microservicio-canciones y en ella ejecutamos el siguiente comando:
       - mongod -dbpath data
     - Arrancar Node.js, para ello abrimos otra consola, navegamos hasta la carpeta de microservicio-canciones y ejecutamos el siguiente comando:
       - node app.js
   - Microservicio en FastApi con base de datos en MySQL
     - Arrancar FastApi, abrimos una consola, navegamos hasta la carpeta de microservicio-login y ejecutamos los siguientes comandos:
       - myenv\Scripts\activate  (Entra en el entorno)
       - uvicorn main:app --reload (Ejecuta el microservicio)
   - Servidor web en react
     - Para arrancar el servidor web, abrimos una consola nueva, navegamos hasta la carpeta src que se encuentra dentro de la carpeta spotify2023 y ejecutamos el siguiente comando:
        - npm start
2) Dependencias que hay que instalar
   - Microservicio en Node.js con base de datos en MongoDB
     - Express --> marco web para Node.js que facilita la creación de servidores web.
       - npm install express
     - Mongoose --> ayuda a interactuar con la base de datos MongoDB de una manera más sencilla.
       - npm install mongoose
   - Microservicio en FastApi con base de datos en MySQL
     - FastApi --> marco web moderno y rápido para construir APIs con Python.
       - pip install fastapi
     - Uvicorn --> servidor web compatible con ASGI que se utiliza comúnmente con FastAPI.
       - pip install uvicorn
     - SQLAlchemy --> biblioteca SQL para Python que se puede utilizar con FastAPI para interactuar con bases de datos SQL, incluido MySQL.
       - pip install sqlalchemy
     - PyMySQL --> controlador de MySQL para SQLAlchemy. Ayuda que SQLAlchemy se conecte a la base de datos MySQL.
       - pip install pymysql
   - Servidor web en react
     - npm install
3) Cómo arrancar la parte servidora
   - Microservicio en Node.js con base de datos en MongoDB
     - mongod -dbpath data
     - node app.js
   - Microservicio en FastApi con base de datos en MySQL
     - myenv\Scripts\activate
     - uvicorn main:app --reload
   - Servidor web en react
     - npm start
4) Cómo acceder a la parte cliente
   - Una vez ejecutado npm start se abre directamente una ventana en el navegador con la pagina web en la siguiente ruta: 'http://localhost:3000'

