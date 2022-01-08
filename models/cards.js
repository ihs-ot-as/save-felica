'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  };
  Cards.init({
    uuid: DataTypes.STRING,
    userId: {
     type :DataTypes.STRING,
     //references:{model:"User", key:"id"}
    }
  }, {
    sequelize,
    tableName:"cards",
    modelName: 'Cards',
  });
  return Cards;
};