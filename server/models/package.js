'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Package extends Model {
        static associate (models) {
            Package.belongsTo(models.User, {
                foreignKey: 'userId',
                onDelete: 'CASCADE',
            })
        }
    }

    Package.init({
        pcg: DataTypes.STRING,
        isUse: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Package',
        tableName: 'packages'
    });
    return Package;
}