'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('records', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid:{
        type : Sequelize.UUID,
        defaultValue : Sequelize.UUIDV4
      },
      device: {
        type: Sequelize.STRING
      },
      operation: {
        type: Sequelize.STRING
      },
      paymentMethod: {
        type: Sequelize.STRING
      },
      exitMethod: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      originSt: {
        type: Sequelize.STRING
      },
      destSt: {
        type: Sequelize.STRING
      },
      balance: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('records');
  }
};