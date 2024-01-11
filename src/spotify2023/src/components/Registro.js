import React, { useState } from 'react';
import './registro.css';

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistro = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://127.0.0.1:8000/registro/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, email, password }), // Asegúrate de tener los valores correctos
      });
  
      if (response.ok) {
        console.log('Registro exitoso');
        // Puedes redirigir a otra página o realizar acciones específicas aquí
        window.location.href = 'http://localhost:3000';
      } else {
        const errorData = await response.json();
        console.error('Registro fallido:', errorData);
        // Muestra mensajes de error al usuario basados en errorData
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      // Lógica para manejar errores de red u otros errores de solicitud
    }
  };
  


  return (
    <div className='body'>
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form action="/login" method="post">
        <label htmlFor="usuario">Usuario:</label>
        <input type="text" id="usuario" name="usuario" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Contraseña:</label>
        <input type="password" id="password" name="password" required />

        <button type="submit" onClick={handleRegistro}>Registrar</button>
      </form>
    </div>
    </div>
  );
};

export default Registro;
