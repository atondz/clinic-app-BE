"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Medicines", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      medicine_code: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true,
      },
      medicine_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      medicine_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "MedicineTypes",
          key: "id",
        },
        onDelete: "RESTRICT",
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      unit: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        onUpdate: Sequelize.NOW,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Medicines");
  },
};