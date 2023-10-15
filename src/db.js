require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME,
} = process.env;


// let sequelize =
//   process.env.NODE_ENV === "production"
//     ? new Sequelize(
//         `postgres://eco:tLKoFub6eYwIxpm4pY6NOSoYDYHWJaWs@dpg-ck7jn5g8elhc7388tm3g-a.oregon-postgres.render.com/ecologico`, //eso es lo que da railway en connect Postgres Connection URL
//         {
//           logging: false, // set to console.log to see the raw SQL queries
//           native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//         }
//       )
//     : new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/eco`, {
//          logging: false, // set to console.log to see the raw SQL queries
//          native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//        });


//        /////

const sequelize = new Sequelize(`postgres://eco:X87rFCaCjDCsZNsySiQjXvcwmiDdbCjQ@dpg-cki7h7mafg7c73b9j3c0-a.oregon-postgres.render.com/eco_3rv0`, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Esta opción permite confiar en certificados auto-firmados
    }
  }
})


const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Products, Line, Brand, User, Review } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Products.belongsToMany(Line, { through: 'Products_Line' });
Line.belongsToMany(Products, { through: 'Products_Line' });

Products.belongsToMany(Brand, { through: 'Products_Brand' });
Brand.belongsToMany(Products, { through: 'Products_Brand' });

Products.hasMany(Review);
Review.belongsTo(Products);

User.hasMany(Review);
Review.belongsTo(User);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};

