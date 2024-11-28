module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Positions", [
      { position: "Kristen", createdAt: new Date(), updatedAt: new Date() },
      { position: "Islam", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Positions", null, {});
  },
};
