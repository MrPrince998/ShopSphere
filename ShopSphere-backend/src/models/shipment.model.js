const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db");

class Shipment extends Model {}

Shipment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Orders",
        key: "id",
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["Pending", "Shipped", "In Transit", "Delivered", "Cancelled"]],
      },
    },
    trackingNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    shippedDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    deliveryDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
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
  },
  {
    sequelize,
    modelName: "Shipment",
  }
);

module.exports = Shipment;
