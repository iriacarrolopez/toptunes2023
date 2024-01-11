import React, { useEffect, useState } from 'react';
import './canciones.css';

function Canciones() {
  const [canciones, setCanciones] = useState([]);

  useEffect(() => {
    // Realiza una solicitud GET al endpoint '/mostrar_canciones' del microservicio
    fetch('http://localhost:5000/mostrar_canciones') // Reemplaza la URL con la dirección de tu microservicio
      .then((response) => response.json())
      .then((data) => {
        // Al recibir los datos de las canciones, actualiza el estado
        setCanciones(data);
      })
      .catch((error) => {
        console.error('Error al obtener las canciones:', error);
      });
  }, []);

  return (
    <div>
      {/* Bloque 1: Encabezado y Barra de Navegación */}
      <header>
      <img src="" />
        <nav>
          <ul>
            <li><a href="http://localhost:3000/canciones">Inicio</a></li>
            <li><a href="http://localhost:3000/estadisticas">Estadísticas</a></li>
            <li><a href="http://localhost:3000/perfil">Perfil</a></li>
          </ul>
        </nav>
      </header>
  
      {/* Bloque 2: Contenido Principal */}
      <div className='content-block'>
        <h1>Listado de Canciones</h1>
        <div className="cancion-container">
          {canciones.map((cancion, index) => (
            <p key={cancion._id} className="cancion-item">
              <p>{cancion.track_name}</p>
              <br />
              <p>{cancion.released_year}</p>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
  
}

export default Canciones;
