const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "User",
      key: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.ENUM(
      "credit_card",
      "debit_card",
      "paypal",
      "cash_on_delivery"
    ),
  },
  paymentStatus: {
    type: DataTypes.ENUM("pending", "paid", "failed"),
    allowNull: false,
    defaultValue: "pending",
  },
  shippingAddressId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Address",
      key: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  status: {
    type: DataTypes.ENUM(
      "pending",
      "confirmed",
      "shipped",
      "delivered",
      "cancelled"
    ),
    allowNull: false,
    defaultValue: "pending",
  },
  shippingFee: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Order;
