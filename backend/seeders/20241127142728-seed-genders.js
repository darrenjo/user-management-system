module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Genders", [
      { gender: "L", createdAt: new Date(), updatedAt: new Date() },
      { gender: "P", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Genders", null, {});
  },
};
