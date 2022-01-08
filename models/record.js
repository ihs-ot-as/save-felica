'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  };
  Record.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      device: DataTypes.STRING,
      operation: DataTypes.STRING,
      paymentMethod: DataTypes.STRING,
      exitMethod: DataTypes.STRING,
      date: DataTypes.DATE,
      originSt: DataTypes.STRING,
      destSt: DataTypes.STRING,
      balance: DataTypes.INTEGER,
      originalBuffer:{
        type: DataTypes.STRING,
        unique: true
      }
    }, {
    sequelize,
    tableName: "records",
    modelName: 'Record',
  });
  return Record;
};