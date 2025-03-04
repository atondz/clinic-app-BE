const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Patient = sequelize.define("Patient", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_card: {
    type: DataTypes.STRING(12),
    allowNull: false,
    unique: true,
  },
  patient_id: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  gender: {
    type: DataTypes.BOOLEAN, // true = Nam, false = Nữ
    allowNull: false,
  },
  birth_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(15),
    allowNull: false,
    unique: true,
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
},
{
  timestamps: true,  // Bật timestamps để Sequelize tự động tạo createdAt và updatedAt
  createdAt: 'createdAt',  // Chỉ định tên cột trong DB là 'createdAt'
  updatedAt: 'updatedAt',  // Chỉ định tên cột trong DB là 'updatedAt'
}

);

module.exports = Patient;
