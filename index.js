const express = require("express");
const app = express();
const { conn } = require('./src/db.js');
const { Pool } = require("pg");
require('dotenv').config();
const server = require('./src/app.js');
const routes = require('./src/routes/index.js');

// Crear un pool de PostgreSQL
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: true
// });

//Define tus rutas aquí
// app.get('/ping', async (req, res) => {
  
//     // Utilizar el pool para ejecutar una consulta en PostgreSQL
//     const result = await pool.query('SELECT NOW()');
//     res.send(result.rows[0]); // Enviar el resultado de la consulta
// });

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});


// Sincronizar todos los modelos a la vez (asumiendo que estás usando Sequelize)
conn.sync({ force: true }).then(() => {
  // Iniciar el servidor Express.js
  const port = process.env.PORT || 3001;
  server.listen(port, () => {
    console.log(`El servidor está ejecutándose en el puerto ${port}`);
  });
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



