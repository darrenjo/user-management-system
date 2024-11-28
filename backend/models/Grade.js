module.exports = (sequelize, DataTypes) => {
  const Grade = sequelize.define("Grade", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    grade: DataTypes.STRING,
  });
  return Grade;
};
