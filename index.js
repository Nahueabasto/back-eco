const server = require('./src/app.js');
require('dotenv').config();

const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log(`port runing in http://localhost:${port}`)
});

