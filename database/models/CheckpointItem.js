const {sequelize, Model, DataTypes} = require("../db");
const {CheckpointItemTypes} = require("../constants");
const Checkpoint = require("./Checkpoint");

class CheckpointItem extends Model {
}

CheckpointItem.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    checkpoint_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Checkpoint,
        key: 'id',
      },
    },
    sequence_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    entity_type: {
      type: DataTypes.ENUM(Object.values(CheckpointItemTypes)),
      allowNull: false,
    },
    entity_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {sequelize},
);

module.exports = CheckpointItem;
