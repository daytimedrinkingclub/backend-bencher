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
    parent_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parent_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    input_type: {
      type: DataTypes.ENUM(Object.values(CourseQuestionInputTypes)),
      allowNull: false,
    },
  },
  {sequelize},
);

module.exports = Question;
