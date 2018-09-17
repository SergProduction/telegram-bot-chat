'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('TFIDFs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tf: {
        type: Sequelize.FLOAT
      },
      df: {
        type: Sequelize.FLOAT
      },
      tf_idf: {
        type: Sequelize.FLOAT
      },
      tf_idf_cosin: {
        type: Sequelize.FLOAT
      },
      /*
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
      */
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('TFIDFs');
  }
};