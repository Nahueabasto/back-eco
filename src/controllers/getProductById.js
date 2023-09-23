const { Sequelize } = require("sequelize");
const { Product, Line, Brand } = require("../db");

const productById = async function(productId){
    if(productId === null){
        throw new Error('You must enter an id')
      }
      const findProduct = await Product.findOne({
        where: {
          id: productId,
        },include: [{ 
          model: Line, 
          attributes: ["name"],
          through: { attributes: [] }},
          { 
            model: Brand, 
            attributes: ["name"],
            through: { attributes: [] }
          },
    ]

      });
      if(findProduct){
         return findProduct;
      }else{
        throw new Error(`The wine with the id ${productId} does not exist in the database`)
      }
} 

module.exports = { productById };
