'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EvaluacionPersona extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EvaluacionPersona.belongsTo(models.Evaluacion, {
        foreignKey: 'evaluacionId',
        as: 'evaluacion',
      });
      EvaluacionPersona.belongsTo(models.Persona, {
        foreignKey: 'personaId',
        as: 'persona',
      });
    }
  };
  EvaluacionPersona.init({
    label: DataTypes.STRING,
    fechaEvaluacion: DataTypes.DATE,
    filename: DataTypes.STRING,
    pExamen: DataTypes.INTEGER,
    pExperiencia: DataTypes.INTEGER,
    pPsicologica: DataTypes.INTEGER,
    pGeneral: DataTypes.INTEGER,
    observaciones: DataTypes.STRING,
    evaluacionId: DataTypes.INTEGER,
    personaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'EvaluacionPersona',
  });
  return EvaluacionPersona;
};