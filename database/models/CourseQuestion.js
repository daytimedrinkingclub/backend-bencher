const {sequelize, Model, DataTypes} = require("../db");
const Course = require("./Course");
const {CourseQuestionInputTypes} = require("../constants");

class CourseQuestion extends Model {
}

CourseQuestion.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    course_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Course,
        key: "id",
      },
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    input_type: {
      type: DataTypes.ENUM(Object.values(CourseQuestionInputTypes)),
      allowNull: false,
    },
    // https://stackoverflow.com/questions/41280608/sequelize-json-data-type
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
    },
    user_answer: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {sequelize},
);

module.exports = CourseQuestion;
