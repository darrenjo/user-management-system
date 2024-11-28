module.exports = (sequelize, DataTypes) => {
  const Placement = sequelize.define("Placement", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    placement: DataTypes.STRING,
  });
  return Placement;
};
