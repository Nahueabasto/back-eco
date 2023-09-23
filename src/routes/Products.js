const { Router } = require("express");
const router = Router();
const { Products, Line, Brand } = require("../db.js")
const { allInfo, getDb, getApi } = require('../controllers/getProducts.js')
const { newReview } = require('../controllers/newReview.js')
const { getReviews } = require('../controllers/getReviews.js')
const { productById } = require('../controllers/getProductById.js')

router.get('/', async (req, res) => {
  const { name } = req.query;
  try {
    // Obtener los productos desde la base de datos
    let products = await Products.findAll({
      include: [
        { model: Line, attributes: ['id', 'name'] },
        { model: Brand, attributes: ['id', 'name'] }
      ]
    });

    // Filtrar productos por nombre si se especifica en la consulta
    if (name) {
      products = products.filter((product) =>
        product.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    

    // Si no hay productos en la base de datos, llamar a la función getApi para obtenerlos desde la API
    if (products.length === 0) {
      const info = await allInfo();

      // Crear los productos en la base de datos
      await Promise.all(
        info.map(async (product) => {

          const filteredProduct = {
            name: product.name,
            price: product.price,
            stock: product.stock,
            size: product.size,
            details: product.details,
            images: product.images
          };

          const [newProduct, created] = await Products.findOrCreate({
            where: { name: product.name },
            defaults: filteredProduct
          });
          if (!created) {
            await newProduct.update(product);
          }
        })
      );

      // Obtener los productos desde la base de datos actualizada
      products = await Products.findAll({
        include: [
          { model: Line, attributes: ['id', 'name'] },
          { model: Brand, attributes: ['id', 'name'] }
        ]
      });
    }

    // Devolver los productos
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Products.findOne({
      where: {
        id: id,    
      },
      include: [
        { model: Line },
        { model: Brand }, // Include the associated Brand model
      ],
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

  router.get("/line/:line", async (req, res) => {
    let lineParam = req.params.line;
    
  
    try {
      const products = await Products.findAll({
        include: [
          { model: Line, attributes: ['id', 'name'] },
        ],
        attributes: ['id', 'name', 'price', 'stock', 'size', 'details', 'images']
      });
  
      // Filter products by line name if specified in the query
      const filteredProducts = products.filter((product) =>
        product.lines.some((lineObj) => lineObj.name.toLowerCase().replace(/\s/g, '-') === lineParam.toLowerCase())
      );
  
      if (filteredProducts.length === 0) {
        return res.status(404).json({ error: "No products to show for that line!" });
    }
    res.status(200).json(filteredProducts);
   } catch (error) {
      res.status(500).json({ error: error.message });
      }
    });



router.get('/:id/review', async (req, res) => {
    try {
        const { id } = req.params;
        let result = await getReviews(id)
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

    router.post('/:id/review', async(req,res)=>{ //http://localhost:3001/products/:id/review lo que tengo que usar en accion
      try{
          const {id} = req.params;// id del producto del que se quiere postear la review
          const {review, rating, email} = req.body; //lo que voy a estar enviando en el formulario tiene que estar esos datos
          let result = await newReview(id, review, rating, email)
          res.status(200).send(result)
      } catch (error) {
          res.status(400).send(error.message)
      }
  })



module.exports = router;

