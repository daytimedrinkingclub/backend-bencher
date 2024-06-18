const {sequelize, Model, DataTypes} = require("../db");
const {CourseQuestionInputTypes} = require("../constants");

class Question extends Model {
}

Question.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    input_type: {
      type: DataTypes.ENUM(Object.values(CourseQuestionInputTypes)),
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
    raw_ai_response: {
      type: DataTypes.TEXT,
      allowNull: true,
      get: function () {
        return JSON.parse(this.getDataValue("raw_ai_response"));
      },
      set: function (value) {
        this.setDataValue("raw_ai_response", JSON.stringify(value));
      },
    },
  },
  {sequelize},
);

module.exports = Question;
