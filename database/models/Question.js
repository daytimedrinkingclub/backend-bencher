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
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {sequelize},
);

module.exports = Question;
