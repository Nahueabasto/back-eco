const axios = require("axios");
const { Products, Line, Brand } = require("../db");



const getApi = async () => {
  

    //traemos todo de la api
    const allProducts = await axios.get(
      "https://6449bfc1a8370fb3213d256e.mockapi.io/api/products"
    );

    //guardamos las líneas
    const uniqueLines = [...new Set(allProducts.data.map((el) => el.line))];
    const linePromises = uniqueLines.map(async (line) => {
      const lineObj = await Line.findOne({ where: { name: line } });
      return lineObj || Line.create({ name: line });
    });
    const lines = await Promise.all(linePromises);

    //guardamos las marcas
    const uniqueBrands = [...new Set(allProducts.data.map((br) => br.brand))];
    const brandPromises = uniqueBrands.map(async (brand) => {
      const brandObj = await Brand.findOne({ where: { name: brand } });
      return brandObj || Brand.create({ name: brand });
    });
    const brands = await Promise.all(brandPromises);


    const products = await Promise.all(
      allProducts.data.map(async (el) => {
        //buscamos la línea de cada producto
        const lineName = el.line;
        const line = lines.find((lineObj) => lineObj.name === lineName);
        //la marca de cada producto
        const brandName = el.brand;
        const brand = brands.find((brandObj) => brandObj.name === brandName);

        const product = await Products.create({
          name: el.name,
          images: el.images.join(", "),
          price: el.price,
          stock: el.stock,
          details: el.details,
          size: el.size,
        });

        // Asociar con la linea!
        if (line) {
          await product.addLine(line);
        }

        // Asociar la marca!
        if (brand) {
          await product.addBrand(brand);
        }
        
        return product;
      })
    );

    console.log("Database Products loaded successfully");

    return products;

};

const getDb = async () => {
  
    const products = await Products.findAll({
      include: [{ model: Line }, // Include the associated Line model
      { model: Brand }, // Include the associated Brand model
    ],
    attributes: ['id', 'name', 'price', 'stock', 'size', 'details', 'images'], // Specify the desired attributes
    });

    console.log('Products loaded successfully');

    return products;

}

const allInfo = async () => {
  try{
  const apiInfo = await getApi();
  const dbInfo = await getDb();
  return apiInfo.concat(dbInfo);
} catch (error) {
  console.log(error);
  throw error;
};
}

module.exports = {
  getApi,
  allInfo,
};