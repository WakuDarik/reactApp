'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Employe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Employe.belongsTo(models.Company, {
        foreignKey: 'companyId',
        onDelete: 'CASCADE',
      })
    }
  };
  Employe.init({
    name: DataTypes.STRING,
    work_day: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Employe',
  });
  return Employe;
};