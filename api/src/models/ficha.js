'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ficha extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Ficha.init({
    numCaja: DataTypes.INTEGER,
    fecha: DataTypes.DATE,
    tipo: DataTypes.STRING,
    estado: DataTypes.BOOLEAN,
    numFicha: DataTypes.STRING,
    orden: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ficha',
  });
  return Ficha;
};