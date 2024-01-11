import React, { useState, useEffect } from 'react';
import './perfil.css';

const UsersComponent = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
        try {
          const response = await fetch('http://localhost:8000/mostrar_usuarios/');
          const data = await response.json();
          setUsers(data);
          console.log(users);
        } catch (error) {
          console.error('Error al obtener usuarios:', error);
        }
      };

    fetchUsers();
  }, [users]);

  return (
    <div>
      {/* Bloque 1: Encabezado y Barra de Navegación */}
      <header>
      <img src=""/>
        <nav>
          <ul>
            <li><a href="http://localhost:3000/canciones">Inicio</a></li>
            <li><a href="http://localhost:3000/estadisticas">Estadísticas</a></li>
            <li><a href="http://localhost:3000/perfil">Perfil</a></li>
          </ul>
        </nav>
      </header>
      <div className='usuarios'>
      <h2>Listado de Usuarios</h2>
      <div className="styles">
        {users.map((user) => (
          <div className="square" key={user.id}>
            <p>
            <strong>Nombre:</strong> {user.name} 
              <br />
              <br />
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        ))}
      </div>
        </div>
    </div>
  );
};

export default UsersComponent;
