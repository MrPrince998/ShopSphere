const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const ProductTag = sequelize.define("ProductTag", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Product",
      key: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  tagId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Tag",
      key: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
});

module.exports = ProductTag;
