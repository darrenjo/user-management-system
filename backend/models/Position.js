module.exports = (sequelize, DataTypes) => {
  const Position = sequelize.define("Position", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    position: DataTypes.STRING,
  });
  return Position;
};
