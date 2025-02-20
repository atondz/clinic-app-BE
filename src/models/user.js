const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('admin', 'doctor', 'staff'),
        allowNull: false,
    },
}, {
    timestamps: true,  // Bật timestamps để Sequelize tự động tạo createdAt và updatedAt
    createdAt: 'created_at',  // Chỉ định tên cột trong DB là 'created_at'
    updatedAt: 'updated_at',  // Chỉ định tên cột trong DB là 'updated_at'
});

module.exports = User;
