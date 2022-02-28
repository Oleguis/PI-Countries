const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('activiTur', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dificultad: {
            type: DataTypes.STRING(1), //ENUM('1', '2', '3', '4', '5'),
            allowNull: false,
        },
        duracion: {
            type: DataTypes.INTEGER,
        },
        temporada: {
            type: DataTypes.STRING(10), //ENUM('Verano', 'Otoño', 'Invierno', 'Primavera'),
            allowNull: false,
        }
    }, 
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false
    })
}
