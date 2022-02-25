const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('continents', {
        continente: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        paises: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false
    })
}