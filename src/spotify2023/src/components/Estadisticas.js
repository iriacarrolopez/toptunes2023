import React, { useState, useEffect } from 'react';
import './estadisticas.css';

const StatsComponent = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/calcular_media');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error al obtener las estadísticas:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Bloque 1: Encabezado y Barra de Navegación */}
      <header>
      <img src="fondo.jpg"/>
        <nav>
          <ul>
            <li><a href="http://localhost:3000/canciones">Inicio</a></li>
            <li><a href="http://localhost:3000/estadisticas">Estadísticas</a></li>
            <li><a href="http://localhost:3000/perfil">Perfil</a></li>
          </ul>
        </nav>
      </header>
      <div className='estadisticas'>
      <h2>Estadísticas</h2>
      {stats ? (
        <div className="estadistica-container">
          <div className="estadistica-item">
            <p><strong>In Apple Playlists:</strong> {stats.in_apple_playlists}</p>
            <p>Número de Apple Playlists en las que han salido las canciones de 2023</p>
          </div>
          <div className="estadistica-item">
            <p><strong>In Apple Charts:</strong> {stats.in_apple_charts}</p>
            <p>Presencia y posiciones de las canciones de 2023 en Apple Music</p>
          </div>
          <div className="estadistica-item">
            <p><strong>In Deezer Playlists:</strong> {stats.in_deezer_playlists}</p>
            <p>Número de Deezer Playlists en las que han salido las canciones de 2023</p>
          </div>
          <div className="estadistica-item">
            <p><strong>In Deezer Charts:</strong> {stats.in_deezer_charts}</p>
            <p>Presencia y posiciones de las canciones de 2023 en Deezer</p> 
          </div>
          <div className="estadistica-item">
            <p><strong>In Shazam Charts:</strong> {stats.in_shazam_charts}</p>
            <p>Presencia y posiciones de las canciones de 2023 en Shazam</p>
          </div>
        </div>
      ) : (
        <p>Cargando estadísticas...</p>
      )}
    </div>
    </div>
  );
};

export default StatsComponent;
