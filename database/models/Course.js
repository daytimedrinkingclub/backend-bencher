const { sequelize, Model, DataTypes } = require("../db");
const Student = require("./Student");
const {CourseStatuses} = require("../constants");

class Course extends Model {}

Course.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    input_query: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    course_status: {
      type: DataTypes.ENUM(Object.values(CourseStatuses)),
      allowNull: false,
    },
    meta: {
      type: DataTypes.TEXT,
      allowNull: true,
      get: function () {
        return JSON.parse(this.getDataValue("meta"));
      },
      set: function (value) {
        this.setDataValue("meta", JSON.stringify(value));
      },
    },
  },
  { sequelize, modelName: "Course" },
);

module.exports = Course;
