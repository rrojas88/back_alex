const { DataTypes } = require('sequelize');
const sequelize = require('../../config/config');

const User = sequelize.define(
  'users',
  {
    // Model attributes are defined here
    name_: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    nick: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    pass: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    token: {
      type: DataTypes.STRING(500),
      allowNull: true
    }
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'users',
    // Nombre de la tabla igual al del modelo
    freezeTableName: true,
    tableName: 'users',
    // Campos fechas
    //timestamps: true,
    createdAt: 'createdat',
    updatedAt: 'updatedat'
  }
);

(async () => {
  await sequelize.sync();
  console.log("The table USERS ready ...!!!");
})();
module.exports = User;
