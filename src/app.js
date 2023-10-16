const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const { conn } = require('./db.js'); // Importa la conexión a la base de datos
const { Pool } = require("pg");


require('./db.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  // Permite el origen de localhost y economia-theta.vercel.app
  const allowedOrigins = ['https://productos-ecologicos.vercel.app', 'http://localhost:3000'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// Define la ruta "/ping" y utiliza el pool para consultar la base de datos
// server.get('/ping', async (req, res) => {
//   try {
//     // Utiliza el pool para ejecutar una consulta en PostgreSQL
//     const result = await conn.query('SELECT NOW()');
//     res.json(result.rows[0]); // Enviar el resultado de la consulta como JSON
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error al ejecutar la consulta en la base de datos' });
//   }
// });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
   ssl: true
});

server.get('/', async (req, res) => {
  try {
    // Utiliza el pool para ejecutar una consulta en PostgreSQL
    const result = await pool.query('SELECT NOW()');

    if (result.rows && result.rows.length > 0) {
      res.json(result.rows[0]); // Enviar el resultado de la consulta como JSON
    } else {
      res.status(404).json({ error: 'No se encontraron resultados' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al ejecutar la consulta en la base de datos' });
  }
});


server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
