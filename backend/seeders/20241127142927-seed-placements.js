module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Placements", [
      { placement: "Jakarta", createdAt: new Date(), updatedAt: new Date() },
      { placement: "Bandung", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Placements", null, {});
  },
};
