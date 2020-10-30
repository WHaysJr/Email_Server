"use strict";

const dates = {
  createdAt: new Date(),
  updatedAt: new Date(),
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Emails", [
      {
        address: "example1@example1.com",
        ...dates,
      },
      {
        address: "example2@example2.com",
        ...dates,
      },
      {
        address: "example3@example3.com",
        ...dates,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Emails", null, {});
  },
};
