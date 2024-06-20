const {sequelize, Model, DataTypes} = require("../db");
const {CheckpointTypes, CheckpointStatuses, CheckpointParentTypes} = require("../constants");

class Checkpoint extends Model {
}

Checkpoint.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    course_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    parent_type: {
      type: DataTypes.ENUM(Object.values(CheckpointParentTypes)),
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
    checkpoint_number: {
      type: DataTypes.INTEGER,
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
    checkpoint_status: {
      type: DataTypes.ENUM(Object.values(CheckpointStatuses)),
      allowNull: false,
      defaultValue: CheckpointStatuses.LOCKED,
    },
  },
  {sequelize, modelName: 'Checkpoint'},
);

module.exports = Checkpoint;
