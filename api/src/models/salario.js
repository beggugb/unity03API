'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Salario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Salario.init({
    nombre: DataTypes.STRING,
    monto: DataTypes.DECIMAL,
    montoHora: DataTypes.DECIMAL,
    montoDia: DataTypes.DECIMAL,
    montoMinutos: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Salario',
  });
  return Salario;
};