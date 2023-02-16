"use strict";
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("testTable", { name: DataTypes.STRING });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("testTable");
  },
};
