'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate (models) {
            User.hasMany(models.Contest, {
                as: 'contests',
            })

            User.hasMany(models.Package, {
                as: 'packages',
            })

            User.hasMany(models.Card, {
                as: 'cards',
            })
        }
    };

    User.init({
        name: DataTypes.STRING,
        password: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            // validate: { isEmail: true },
            unique: true
        },
        accType: DataTypes.BOOLEAN,
        balance: DataTypes.DOUBLE
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};

