const { Answer, Checkpoint, Content, Question, CheckpointItem } = require("../../database/models");
const { CheckpointItemTypes } = require("../../database/constants");

const CheckpointItemModelMap = {
  [CheckpointItemTypes.QUESTION]: Question,
  [CheckpointItemTypes.CONTENT]: Content,
  [CheckpointItemTypes.ANSWER]: Answer,
};

const createCheckpointItem = async (checkpointId, itemType, itemPayload) => {
  const checkpoint = await Checkpoint.findOne({ where: { id: checkpointId }, include: ["CheckpointItems"] });

  console.log('checkpoint', checkpoint);
  if (!checkpoint) {
    throw new Error(`Checkpoint with ID ${checkpointId} not found.`);
  }

  const ItemModel = CheckpointItemModelMap[itemType];

  if (!ItemModel) {
    throw new Error(`Invalid item type: ${itemType}`);
  }

  const item = await ItemModel.create(itemPayload);
  const sequenceNumber = checkpoint.CheckpointItems.length + 1;

  console.log('item', item);
  console.log('sequenceNumber', sequenceNumber);

  const checkpointItem = await CheckpointItem.create({
    checkpoint_id: checkpointId,
    sequence_number: sequenceNumber,
    entity_type: itemType,
    entity_id: item.id,
  });

  return { checkpointItem, entity: item };
};

const getCheckpointItemEntity = async (checkpointItemId) => {
  const checkpointItem = await CheckpointItem.findOne({
    where: { id: checkpointItemId },
  });

  if (!checkpointItem) {
    throw new Error(`CheckpointItem with ID ${checkpointItemId} not found.`);
  }

  const { entity_type, entity_id } = checkpointItem;

  const ItemModel = CheckpointItemModelMap[entity_type];

  if (!ItemModel) {
    throw new Error(`Invalid entity type: ${entity_type}`);
  }

  const entity = await ItemModel.findOne({
    where: { id: entity_id },
  });

  if (!entity) {
    throw new Error(`Entity with ID ${entity_id} not found for entity type ${entity_type}.`);
  }

  return {
    checkpointItem,
    entity,
  };
};

module.exports = {
  createCheckpointItem,
}
