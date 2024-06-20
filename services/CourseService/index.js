const {Checkpoint, Course, Question, Content, Answer, CheckpointItem} = require("../../database/models");
const { CheckpointStatuses, CourseStatuses, CheckpointTypes, CheckpointItemTypes} = require("../../database/constants");

const CheckpointItemModelMap = {
  [CheckpointItemTypes.QUESTION]: Question,
  [CheckpointItemTypes.CONTENT]: Content,
};

const CheckpointItemModelIncludeMap = {
  [CheckpointItemTypes.QUESTION]: [Answer],
};

class CourseService {
  constructor(studentId, config = {}) {
    this.studentId = studentId;
    this.config = config;
  }

  async createCourseCheckpoint(courseId, {
    parentType = "Course",
    parentId,
    name,
    description,
    checkpointNumber,
    checkpointType = CheckpointTypes.REGULAR,
    checkpointStatus = CheckpointStatuses.LOCKED,
    meta = {},
  }) {
    const checkpoint = await Checkpoint.create({
      course_id: courseId,
      parent_id: parentId,
      parent_type: parentType,
      name,
      checkpoint_type: checkpointType,
      description,
      checkpoint_number: checkpointNumber,
      checkpoint_status: checkpointStatus,
      meta,
    });

    return checkpoint;
  }

  async createCourse(query) {
    this.query = query;
    const course = await Course.create({
      student_id: this.studentId,
      input_query: this.query,
      course_status: CourseStatuses.ONGOING,
    });

    await Checkpoint.create({
      course_id: course.id,
      parent_id: course.id,
      parent_type: "Course",
      name: "Onboarding",
      checkpoint_type: CheckpointTypes.ONBOARDING,
      description: "This is the onboarding checkpoint",
      checkpoint_number: 1,
      checkpoint_status: CheckpointStatuses.UNLOCKED,
    });

    this.course = this.getCourse(course.id);
    return this.course;
  }

  async getCourse(courseId) {
    const course = await Course.findOne({
      where: { id: courseId, student_id: this.studentId },
      include: [
        {
          model: Checkpoint,
          as: 'Checkpoints',
        },
      ],
    });

    return course;
  }

  async getOnboardingCheckpoint(courseId) {
    const course = await this.getCourse(courseId);

    if (!course) {
      throw new Error(`Course with ID ${courseId} not found.`);
    }

    const onboardingCheckpoint = await Checkpoint.findOne({
      where: { parent_id: courseId, checkpoint_type: CheckpointTypes.ONBOARDING },
    });

    return onboardingCheckpoint;

  }

 async createCheckpointItem(checkpointId, itemType, itemPayload) {
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

async getCheckpointItemEntity(checkpointItemId, { checkpointItem: providedCheckpointItem } = {}) {
  const checkpointItem = providedCheckpointItem || await CheckpointItem.findOne({
    where: { id: checkpointItemId },
  });

  if (!checkpointItem) {
    throw new Error(`CheckpointItem with ID ${checkpointItemId} not found.`);
  }

  const { entity_type, entity_id } = checkpointItem;

  const ItemModel = CheckpointItemModelMap[entity_type];
  const itemIncludes = CheckpointItemModelIncludeMap[entity_type] || [];

  if (!ItemModel) {
    throw new Error(`Invalid entity type: ${entity_type}`);
  }

  const entity = await ItemModel.findOne({
    where: { id: entity_id },
    include: itemIncludes,
    // attributes: { exclude: ['raw_ai_response'] }
  });

  if (!entity) {
    throw new Error(`Entity with ID ${entity_id} not found for entity type ${entity_type}.`);
  }

  return {
    checkpointItem,
    entity: {
      ...(entity.toJSON()),
      entity_type: entity_type,
    },
  };
};

  async getCourseCheckpointItems(courseId, checkpointId) {
    const course = await Course.findOne({ where: { id: courseId, student_id: this.studentId } });

    if (!course) {
      throw new Error(`Course with ID ${courseId} not found.`);
    }

    const checkpointItems = await CheckpointItem.findAll({
      where: { checkpoint_id: checkpointId },
      order: [['sequence_number', 'ASC']],
    });

    const itemEntities = await Promise.all(
      checkpointItems.map(async (checkpointItem) => {
        const { entity } = await this.getCheckpointItemEntity(checkpointItem.id, { checkpointItem });
        return entity;
      })
    );

    return itemEntities;
  }

  async getCourseOnboardingQuestions(courseId) {
    const courseOnboardingCheckpoint = await Checkpoint.findOne({
      where: { parent_id: courseId, checkpoint_type: CheckpointTypes.ONBOARDING },
    });

    if (!courseOnboardingCheckpoint) {
      throw new Error(`Onboarding checkpoint not found for course with ID ${courseId}.`);
    }

    const checkpointItems = await this.getCourseCheckpointItems(courseId, courseOnboardingCheckpoint.dataValues.id);
    const questions = checkpointItems.filter((entity) => entity.entity_type === CheckpointItemTypes.QUESTION);

    return questions;
  }
}

module.exports = CourseService;
