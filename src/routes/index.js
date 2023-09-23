const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();     
const Products = require("./Products");
const users = require("./users")
//const Lines = require("./Line");
//const Brands = require("./getBrand");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/products", Products);
router.use("/users", users);
//router.use("/line", getLine);
//router.use("/brands", Brands);

module.exports = router;
