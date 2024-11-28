module.exports = (sequelize, DataTypes) => {
  const Religion = sequelize.define("Religion", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
  });
  return Religion;
};
