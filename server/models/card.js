'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Card extends Model {
        static associate (models) {
            Card.belongsTo(models.User, {
                foreignKey: 'userId',
                onDelete: 'CASCADE',
            })
        }
    }

    Card.init({
        card : DataTypes.INTEGER,
        cvv: DataTypes.INTEGER,
        balance: DataTypes.DOUBLE,

    }, {
        sequelize,
        modelName: 'Card',
    });
    return Card;
}