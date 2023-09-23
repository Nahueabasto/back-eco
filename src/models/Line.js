// models/line.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('line', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
