// models/products.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
    sequelize.define('products', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      images: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stock: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      details: {
        type: DataTypes.STRING(10000),
        allowNull: false,
      },
      size: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    });
  };
