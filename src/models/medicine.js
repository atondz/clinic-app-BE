const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const MedicineType = require("./medicineType");

const Medicine = sequelize.define("Medicine", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  medicine_code: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
  },
  medicine_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  medicine_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: MedicineType,
      key: "id",
    },
  },
  price: {
    type: DataTypes.INTEGER, // Giá tính bằng VNĐ, dùng INTEGER để tránh lỗi thập phân
    allowNull: false,
  },
  unit: {
    type: DataTypes.STRING(20), // Đơn vị tính: viên, lọ, ống, ...
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true,
  createdAt: "createdAt",
  updatedAt: "updatedAt",
});

// Thiết lập quan hệ
MedicineType.hasMany(Medicine, { foreignKey: "medicine_type_id" });
Medicine.belongsTo(MedicineType, { foreignKey: "medicine_type_id" });

module.exports = Medicine;