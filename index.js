const express = require("express");
const app = express();
const { conn } = require('./src/db.js');
const { Pool } = require("pg");


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




// Sincronizar todos los modelos a la vez (asumiendo que estás usando Sequelize)
// conn.sync({ force: true }).then(() => {
//   // Iniciar el servidor Express.js
//   const port = process.env.PORT || 3001;
//   server.listen(port, () => {
//     console.log(`El servidor está ejecutándose en el puerto ${port}`);
//   });
// });

const server = require('./src/app.js');
require('dotenv').config();

const port = process.env.PORT || 3001;

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



