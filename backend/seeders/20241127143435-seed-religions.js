module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Religions", [
      { name: "Kristen", createdAt: new Date(), updatedAt: new Date() },
      { name: "Islam", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Religions", null, {});
  },
};
