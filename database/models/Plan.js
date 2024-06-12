const { sequelize, Model, DataTypes } = require("../db");

class Plan extends Model {}

Plan.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: 'INR',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    period: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 30,
    },
    active_courses: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    assesments: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    archived_courses: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { sequelize },
);

module.exports = Plan;


