"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("Users", [
      {
        name: "John Admin",
        email: "john.doe@doe.com",
        password: "test",
        age: "25",
        phone: "06.00.00.00.00",
        admin: true,
        estateAgent: false,
        picture: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "John NoAdmin",
        email: "john.doe2@doe.com",
        password: "test",
        age: "35",
        phone: "06.00.00.00.01",
        admin: false,
        estateAgent: true,
        picture: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
