module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define("Employee", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nip: {
      type: DataTypes.STRING,
      unique: true,
    },
    name: DataTypes.STRING,
    birth_place: DataTypes.STRING,
    address: DataTypes.TEXT,
    birth_date: DataTypes.DATE,
    gender_id: DataTypes.INTEGER,
    grade_id: DataTypes.INTEGER,
    echelon_id: DataTypes.INTEGER,
    position_id: DataTypes.INTEGER,
    job_placement_id: DataTypes.INTEGER,
    religion_id: DataTypes.INTEGER,
    unit_id: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    npwp: DataTypes.STRING,
  });

  // Relasi antar model
  Employee.associate = (models) => {
    Employee.belongsTo(models.Religion, { foreignKey: "religion_id" });
    Employee.belongsTo(models.Unit, { foreignKey: "unit_id" });
    Employee.belongsTo(models.Gender, { foreignKey: "gender_id" });
    Employee.belongsTo(models.Grade, { foreignKey: "grade_id" });
    Employee.belongsTo(models.Echelon, { foreignKey: "echelon_id" });
    Employee.belongsTo(models.Position, { foreignKey: "position_id" });
    Employee.belongsTo(models.Placement, { foreignKey: "job_placement_id" });
  };

  return Employee;
};
