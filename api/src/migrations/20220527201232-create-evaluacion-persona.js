'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('EvaluacionPersonas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      label: {
        type: Sequelize.STRING
      },
      fechaEvaluacion: {
        type: Sequelize.DATE
      },
      filename: {
        type: Sequelize.STRING
      },
      pExamen: {
        type: Sequelize.INTEGER
      },
      pExperiencia: {
        type: Sequelize.INTEGER
      },
      pPsicologica: {
        type: Sequelize.INTEGER
      },
      pGeneral: {
        type: Sequelize.INTEGER
      },
      observaciones: {
        type: Sequelize.STRING
      },
      evaluacionId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Evaluacions',
            key: 'id',
            as: 'evaluacionId'
        }
      },
      personaId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Personas',
            key: 'id',
            as: 'personaId'
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
    await queryInterface.dropTable('EvaluacionPersonas');
  }
};