const express = require("express");
const app = express();
const { conn } = require('./src/db.js');
const { Pool } = require("pg");
require('dotenv').config();
const server = require('./src/app.js');

//config()

//Crear un pool de PostgreSQL

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // ssl: true
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

//Define tus rutas aquí
// app.get('/ping', async (req, res) => {
  
//     // Utilizar el pool para ejecutar una consulta en PostgreSQL
//     const result = await pool.query('SELECT NOW()');
//     res.send(result.rows[0]); // Enviar el resultado de la consulta
// });


// Sincronizar todos los modelos a la vez (asumiendo que estás usando Sequelize)
// conn.sync({ force: true }).then(() => {
//   // Iniciar el servidor Express.js
//   const port = process.env.PORT || 3001;
//   server.listen(port, () => {
//     console.log(`El servidor está ejecutándose en el puerto ${port}`);
//   });
// });


const port = process.env.PORT || 5432;

server.listen(port, () => {
  console.log(`port runing in http://localhost:${port}`)
});





// const server = require('./src/app.js');
// const { conn } = require('./src/db.js');
// require('dotenv').config();

// const port = process.env.PORT || 3001;

// // Sincroniza la base de datos y luego inicia el servidor
// conn.sync({ force: false }).then(() => {
//   server.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
//   });
// });



