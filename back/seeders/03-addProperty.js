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

    await queryInterface.bulkInsert("Properties", [
      {
        title: "Auto1",
        picture: "",
        address: "Auto test",
        price: 2,
        sector: "Auto test",
        room: 2,
        description: "Auto test",
        advantage: "Auto test",
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Auto2",
        picture: "",
        address: "Auto test",
        price: 2,
        sector: "Auto test",
        room: 2,
        description: "Auto test",
        advantage: "Auto test",
        UserId: 1,
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
