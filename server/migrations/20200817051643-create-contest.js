'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Contests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      industry: {
        type: Sequelize.STRING
      },
      awardAmount: {
        type: Sequelize.STRING
      },
      contestName: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      targetCustomer: {
        type: Sequelize.STRING
      },
      nameVenture: {
        type: Sequelize.STRING
      },
      visualStyle: {
        type: Sequelize.STRING
      },
      preference: {
        type: Sequelize.STRING
      },
      typeName: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId'
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Contests');
  }
};