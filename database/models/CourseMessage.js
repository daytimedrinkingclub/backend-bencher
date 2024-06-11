const {sequelize, Model, DataTypes} = require("../db");
const CourseGoal = require("./CourseGoal");

class CourseMessage extends Model {
}

CourseMessage.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    course_goal_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: CourseGoal,
        key: "id",
      },
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message_type: {
      type: DataTypes.ENUM("information", "gather_requirement", "quiz", "doubt"),
      allowNull: false,
    },
    user_type: {
      type: DataTypes.ENUM("user", "assistant", "system"),
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
      defaultValue: {},
    }
  },
  {sequelize},
);

module.exports = CourseMessage;
