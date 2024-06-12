const {sequelize, Model, DataTypes} = require("../db");
const {Question} = require("./index");

class Answer extends Model {
}

Answer.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    question_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Question,
        key: 'id',
      },
    },
    ai_mcq_answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_mcq_answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ai_rich_answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_rich_answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_answer_data: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {sequelize},
);

module.exports = Answer;
