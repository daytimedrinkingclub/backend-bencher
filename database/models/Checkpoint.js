const {sequelize, Model, DataTypes} = require("../db");
const {CheckpointTypes, CheckpointStatuses} = require("../constants");

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
    checkpoint_type: {
      type: DataTypes.ENUM(Object.values(CheckpointTypes)),
      allowNull: false,
      defaultValue: CheckpointTypes.REGULAR,
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
      type: DataTypes.ENUM(Object.values(CheckpointStatuses)),
      allowNull: false,
      defaultValue: CheckpointStatuses.LOCKED,
    },
  },
  {sequelize, modelName: 'Checkpoint'},
);

module.exports = Checkpoint;
