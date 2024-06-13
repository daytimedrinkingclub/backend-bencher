const {sequelize, Model, DataTypes} = require("../db");

class Checkpoint extends Model {
}

Checkpoint.init(
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
    checkpoint_details: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    checkpoint_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    checkpoint_status: {
      type: DataTypes.STRING(36),
      allowNull: false,
    },
  },
  {sequelize, modelName: 'Checkpoint'},
);

module.exports = Checkpoint;
