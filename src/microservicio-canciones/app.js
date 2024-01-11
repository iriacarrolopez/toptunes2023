// Importa las dependencias
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importa la biblioteca CORS
const csv = require('csv-parser');
const fs = require('fs');

const app = express();
const port = 5000;

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


// Configuración de la base de datos MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/spotify', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', function () {
  console.log('Conexión exitosa a MongoDB');
});

// Swagger Options
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Spotify Microservicio API',
      description: 'API para el microservicio de Spotify',
      contact: {
        name: 'Iria Carro López',
      },
      servers: [`http://localhost:${port}`],
    },
  },
  apis: ['app.js'], // Especifica los archivos que contienen las rutas que deseas documentar
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerOptions)));

// Modelo de usuario
const User = mongoose.model('User', {
  name: String,
  email: String,
});

// Define el esquema para el modelo de canción
const songSchema = new mongoose.Schema({
  track_name: String,
  artist_name: String,
  artist_count: Number,
  released_year: Number,
  released_month: Number,
  released_day: Number,
  in_spotify_playlists: Number,
  in_spotify_charts: Number,
  streams: Number,
  in_apple_playlists: Number,
  in_apple_charts: Number,
  in_deezer_playlists: Number,
  in_deezer_charts: Number,
  in_shazam_charts: Number,
  bpm: Number,
  key: String,
  mode: String,
  danceability: Number,
  valence: Number,
  energy: Number,
  acousticness: Number,
  instrumentalness: Number,
  liveness: Number,
  speechiness: Number,
});

// Crea el modelo Song
const Song = mongoose.model('Song', songSchema);

// Exporta el modelo para su uso en otras partes del código
module.exports = Song;

// Middleware para permitir solicitudes CORS
app.use(cors());

/**
 * @swagger
 * /insertar_canciones:
 *   post:
 *     summary: Inserta datos desde un CSV a la base de datos.
 *     responses:
 *       200:
 *         description: Datos de canciones insertados correctamente.
 *       400:
 *         description: No hay datos en el CSV.
 */
app.post('/insertar_canciones', async (req, res) => {
  try {
    const results = [];

    // Leer datos del CSV
    fs.createReadStream('spotify.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        // Verificar si hay datos en el array
        if (results.length === 0) {
          return res.status(400).json({ error: 'No hay datos en el CSV.' });
        }

        // Insertar nuevos documentos en la colección de canciones
        await Song.insertMany(results);

        res.json({ message: 'Datos de canciones insertados correctamente' });
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /mostrar_canciones:
 *   get:
 *     summary: Obtiene todas las canciones.
 *     responses:
 *       200:
 *         description: Lista de canciones.
 *       500:
 *         description: Error del servidor.
 */
app.get('/mostrar_canciones', async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /calcular_media:
 *   get:
 *     summary: Calcula la media de algunas columnas.
 *     responses:
 *       200:
 *         description: Estadísticas calculadas.
 *       400:
 *         description: No hay canciones en la base de datos.
 *       500:
 *         description: Error del servidor.
 */
app.get('/calcular_media', async (req, res) => {
  try {
    const canciones = await Song.find();

    if (canciones.length === 0) {
      return res.status(400).json({ error: 'No hay canciones en la base de datos.' });
    }

    // Lógica para calcular la media de las columnas
    const calcularMedia = (columna) => {
      const total = canciones.reduce((acumulador, cancion) => acumulador + cancion[columna], 0);
      const media = total / canciones.length;
      return media.toFixed(2); // Ajusta la precisión decimal según tus necesidades
    };

    const stats = {
      in_apple_playlists: calcularMedia('in_apple_playlists'),
      in_apple_charts: calcularMedia('in_apple_charts'),
      in_deezer_playlists: calcularMedia('in_deezer_playlists'),
      in_deezer_charts: calcularMedia('in_deezer_charts'),
      in_shazam_charts: calcularMedia('in_shazam_charts'),
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
