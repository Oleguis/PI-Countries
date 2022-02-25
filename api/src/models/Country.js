const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo

  sequelize.define('country', {
    id: {
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey: true,
      unique: true,
      index: true,
    },
    nro: {
      type: DataTypes.INTEGER,
      allowNull: false,
      index: true,
    },
    nombrecorto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombrelargo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    continente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING,
    },
    subregion: {
      type: DataTypes.STRING,
    },
    area: {
      type: DataTypes.DECIMAL,
    },
    poblacion: {
      type: DataTypes.INTEGER,
    },
    bandera: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    escudo: {
      type: DataTypes.STRING,
    },
  }, 
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    // indexes: [
    //   {
    //     name: 'countries_nombreCorto',
    //     using: 'BTREE',
    //     fields: [ 'nombrecorto'
    //     ]
    //   }
    // ]
  });
};
