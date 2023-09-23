// const server = require('./src/app.js');
// const { conn } = require('./src/db.js');
// require('dotenv').config();

// // Syncing all the models at once.
// conn.sync({ force: false }).then(() => {
//   server.listen(process.env.PORT, () => {
  
//     console.log('%s listening at 3001', process.env.PORT); // eslint-disable-line no-console
//   });
// });

const server = require('./src/app.js');
const { conn } = require('./src/db.js');
require('dotenv').config();

const port = process.env.PORT || 3001;

// Sincroniza la base de datos y luego inicia el servidor
conn.sync({ force: false }).then(() => {
  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});



