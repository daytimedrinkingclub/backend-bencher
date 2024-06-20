const { Checkpoint, Course} = require('../../database/models');
const {CheckpointTypes, CheckpointItemTypes, CheckpointParentTypes} = require("../../database/constants");

const CheckpointParentModelMap = {
  [CheckpointParentTypes.CHECKPOINT]: Checkpoint,
  [CheckpointParentTypes.COURSE]: Course,
};

class ChapterService {
  constructor(studentId) {
    this.studentId = studentId;
  }

  async isEntityValid(entityType, entityId) {
    if (entityType === CheckpointParentTypes.COURSE) {
      const entity = await Course.findOne({
        where: {
          id: entityId,
          student_id: this.studentId,
        },
      });

      return !!entity;
    }

    if (entityType === CheckpointParentTypes.CHECKPOINT) {
      const entity = await Checkpoint.findOne({
        where: {
          id: entityId,
          include: [
            {
              model: Course,
              where: {
                student_id: this.studentId,
              },
            },
          ],
        },
      });

      return !!entity;
    }

    return false;
  }

  async getChapters(entityType, entityId) {
    if (!(await this.isEntityValid(entityType, entityId))) return [];

    const chapters = await Checkpoint.findAll({
      where: {
        parent_type: entityType,
        parent_id: entityId,
        checkpoint_type: CheckpointTypes.REGULAR,
      },
    });
    return chapters;
  }
}

module.exports = ChapterService;
