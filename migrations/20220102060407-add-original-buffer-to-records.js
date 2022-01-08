'use strict';

const sequelize = require("sequelize");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('records', 'originalBuffer', {
          type: Sequelize.STRING,
          unique: true
        }),
        queryInterface.removeColumn('users', 'cardUuid')
        //we don't have cards table in the first place so leave it here...

      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        //queryInterface.removeColumn('table_name', 'field_one_name'),
        /* queryInterface.removeColumn('table_name', 'field_two_name')*/
      ])
    })
  }
};
