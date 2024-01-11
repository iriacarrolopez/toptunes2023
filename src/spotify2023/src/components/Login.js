import React, { useState } from 'react';
import './login.css';

const Login = () => {
  const [username, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Lógica adicional después de un inicio de sesión exitoso
        console.log('Inicio de sesión exitoso');
        window.location.href = 'http://localhost:3000/canciones';
        // Puedes redirigir a otra página o realizar acciones específicas aquí
      } else {
        console.error('Inicio de sesión fallido');
        // Lógica para manejar un inicio de sesión fallido, por ejemplo, mostrar un mensaje de error
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      // Lógica para manejar errores de red u otros errores de solicitud
    }
  };

  const handleRegistro = async (e) => {
    e.preventDefault();
    window.location.href = 'http://localhost:3000/registro';

  };



    // window.location.href = 'http://localhost:3000/registro';


    return (
        <div className='body'>
          <div className="login-container">
            <h2 className='inicio-sesion'>Iniciar Sesión</h2>
            <form action="/login" method="post" onSubmit={handleLogin} className='form'>
              <label>Usuario:</label>
              <input id="email" name="email" value={username} onChange={(e) => setName(e.target.value)} required />
      
              <label htmlFor="password">Contraseña:</label>
              <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      
              <button type="submit" onClick={handleLogin}>Iniciar Sesión</button>
            </form>
          </div>
        </div>
      );
      
};

export default Login;
