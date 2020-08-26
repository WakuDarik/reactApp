'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Contest.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      })
    }
  };

  Contest.init({
    industry: DataTypes.STRING,
    awardAmount: DataTypes.STRING,
    contestName: DataTypes.STRING,
    description: DataTypes.STRING,
    targetCustomer: DataTypes.STRING,
    nameVenture: DataTypes.STRING,
    visualStyle: DataTypes.STRING,
    preference: DataTypes.STRING,
    typeName: DataTypes.STRING,
    activity: DataTypes.BOOLEAN,
    dataFinish: DataTypes.DATEONLY,
    cost: DataTypes.DOUBLE,
    winerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Contest',
  });
  return Contest;
};