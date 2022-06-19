'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Evaluacions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fechaInicio: {
        type: Sequelize.DATE
      },
      fechaVencimiento: {
        type: Sequelize.DATE
      },
      nombre: {
        type: Sequelize.STRING
      },
      tipo: {
        type: Sequelize.STRING
      },      
      cargoId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Cargos',
            key: 'id',
            as: 'cargoId'
        }
      },
      departamentoId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Departamentos',
            key: 'id',
            as: 'departamentoId'
        }
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
    await queryInterface.dropTable('Evaluacions');
  }
};