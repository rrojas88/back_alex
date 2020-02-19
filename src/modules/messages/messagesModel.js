const { DataTypes, Deferrable } = require('sequelize');

const sequelize = require('../../config/config');

const User = require('../users/usersModel');

const Message = sequelize.define(
  'messages',
  {
    target: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    message: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    new_: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        // This is a reference to another model
        model: User,
        // This is the column name of the referenced model
        key: 'id',
  
        // With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
        deferrable: Deferrable.INITIALLY_IMMEDIATE
        // Options:
        // - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign key constraints
        // - `Deferrable.INITIALLY_DEFERRED` - Defer all foreign key constraint check to the end of a transaction
        // - `Deferrable.NOT` - Don't defer the checks at all (default) - This won't allow you to dynamically change the rule in a transaction
      }
    }
  },
  {
    sequelize,
    modelName: 'messages',
    // Nombre de la tabla igual al del modelo
    freezeTableName: true,
    tableName: 'messages',
    // Campos fechas
    timestamps: true,
    createdAt: 'createdat',
    updatedAt: 'updatedat'
  }
);

(async () => {
  await sequelize.sync();
  console.log("The table MESSAGES ready ...!!!");
})();
module.exports = Message;
