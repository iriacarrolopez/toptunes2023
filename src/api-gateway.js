const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 7000;

app.use(bodyParser.json());

// Endpoint para el login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const response = await axios.post('http://localhost:8000/login', { username, password });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// // Endpoint para obtener canciones
// app.get('/mostrar_canciones', async (req, res) => {
//   try {
//     // Llamada al microservicio para obtener canciones
//     const response = await axios.get('http://localhost:5000/mostrar_canciones');
//     res.json(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error en el servidor' });
//   }
// });

app.get('/mostrar_canciones', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:5000/mostrar_canciones');
    const responseData = JSON.parse(response.data);


    // Aquí puedes trabajar directamente con responseData como un objeto JavaScript

    res.json(responseData);
  } catch (error) {
    console.error('Error al obtener las canciones:', error.message);
    res.status(error.response ? error.response.status : 500).json({ error: 'Error en el servidor' });
  }
});

  

// Endpoint para obtener estadísticas
app.get('/estadisticas', async (req, res) => {
  try {
    // Llamada al microservicio para obtener estadísticas
    const response = await axios.get('http://localhost:5000/estadisticas');
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Endpoint para obtener el perfil del usuario
app.get('/perfil', async (req, res) => {
  try {
    // Llamada al microservicio para obtener el perfil del usuario
    const response = await axios.get('http://localhost:5000/perfil');
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
