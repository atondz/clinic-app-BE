const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const MedicineType = sequelize.define("MedicineType", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  medicine_type_code: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
  },
  medicine_type_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  timestamps: true, // Tự động thêm createdAt và updatedAt
  createdAt: "createdAt",
  updatedAt: "updatedAt",
});

module.exports = MedicineType;