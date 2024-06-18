const {sequelize, Model, DataTypes} = require("../db");
const Answer = require("./Answer");

class AnswerAnalysis extends Model {
}

AnswerAnalysis.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    answer_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Answer,
        key: 'id',
      },
    },
    answer_analysis: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {sequelize},
);

module.exports = AnswerAnalysis;
