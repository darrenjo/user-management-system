module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Echelons", [
      { echelon: "I", createdAt: new Date(), updatedAt: new Date() },
      { echelon: "II", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Echelons", null, {});
  },
};
