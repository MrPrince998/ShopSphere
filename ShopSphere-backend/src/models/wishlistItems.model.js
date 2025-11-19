const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db");

const WishlistItem = sequelize.define("WishlistItem", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  wishlistId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Wishlists",
      key: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Products",
      key: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  addedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});
module.exports = WishlistItem;
