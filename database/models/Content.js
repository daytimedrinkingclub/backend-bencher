const {sequelize, Model, DataTypes} = require("../db");
const {CheckpointItem} = require("./index");

class Content extends Model {
}

Content.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    checkpoint_item_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: CheckpointItem,
        key: 'id',
      },
    },
    content_type: {
      type: DataTypes.STRING(36),
      allowNull: false,
    },
    content_json: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    content_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    content_html: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {sequelize},
);

module.exports = Content;
