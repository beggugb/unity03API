'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Evaluacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Evaluacion.belongsTo(models.Cargo, {
        foreignKey: 'cargoId',
        as: 'cargo',
      });
      Evaluacion.belongsTo(models.Departamento, {
        foreignKey: 'departamentoId',
        as: 'departamento',
      });
    }
  };
  Evaluacion.init({
    fechaInicio: DataTypes.DATE,
    fechaVencimiento: DataTypes.DATE,
    nombre: DataTypes.STRING,
    tipo: DataTypes.STRING,
    estado: DataTypes.STRING,
    cargoId: DataTypes.INTEGER,
    departamentoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Evaluacion',
  });
  return Evaluacion;
};