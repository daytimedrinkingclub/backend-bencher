const { sequelize, Model, DataTypes } = require("../db");
const Student = require("./Student");
const Plan = require("./Plan");

class StudentPlan extends Model {}

StudentPlan.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    student_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Student,
        key: 'id',
      },
    },
    plan_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Plan,
        key: 'id',
      },
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'student_plans',
    underscored: true,
  }
);

module.exports = StudentPlan;
