const {Checkpoint, Course} = require("../../database/models");
const { CheckpointStatuses, CourseStatuses, CheckpointTypes} = require("../../database/constants");

class CourseService {
  constructor(studentId, config = {}) {
    this.studentId = studentId;
    this.config = config;
  }

  async createCourse(query) {
    this.query = query;
    const course = await Course.create({
      student_id: this.studentId,
      input_query: this.query,
      course_status: CourseStatuses.ONGOING,
    });

    await Checkpoint.create({
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
}

module.exports = CourseService;
