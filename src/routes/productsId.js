const { Router } = require("express");
const router = Router();

const axios = require('axios')
const { Products, Line, Brand, } = require('../db')

router.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params.id;

    const product = await Products.findOne({
      where: {
        id: id,    
      },
      include: {
        model: Line,
        through:{
          attributes: [],
        },
      },
      attributes: ["id", "name", "price", "stock", "size", "details", "images"],
    });

    if (product) {
      return res.json(product);
    } else {
      throw new Error("Product not found");
    }
  } catch (error) {
    res.status(404).json("You messed up, Lu");
  }
  });

  module.exports = router;