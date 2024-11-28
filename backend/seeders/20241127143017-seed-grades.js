module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Grades", [
      { grade: "I/a", createdAt: new Date(), updatedAt: new Date() },
      { grade: "II/a", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Grades", null, {});
  },
};
