const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Review = sequelize.define("Review", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "User",
      key: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
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
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  review: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

model.