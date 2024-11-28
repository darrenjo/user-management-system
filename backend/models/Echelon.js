module.exports = (sequelize, DataTypes) => {
  const Echelon = sequelize.define("Echelon", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    echelon: DataTypes.STRING,
  });
  return Echelon;
};
