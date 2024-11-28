module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Units", [
      { name: "IT", createdAt: new Date(), updatedAt: new Date() },
      { name: "Marketing", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Units", null, {});
  },
};
