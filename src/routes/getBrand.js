const { Router } = require('express');
const { Brand } = require("../db");
const { api } = require("./controllers/getProducts")
const router = Router();


router.get('/brands', async (req, res) => {
try {
const brands = await Brand.findAll()
res.json(brands)
} catch (error) {
res.status(400).send(error.message)
}
});

module.exports = router;