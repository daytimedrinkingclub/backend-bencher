const CourseService = require("../CourseService");
const courseCreationTools = require("./course_creation_tools");
const Anthropic = require("../../llm/Anthropic");
const {CheckpointItemTypes, CheckpointTypes, CheckpointStatuses, CheckpointParentTypes} = require("../../database/constants");

class CoursePlanService {
  constructor(studentId, courseId) {
    this.studentId = studentId;
    this.courseId = courseId;
  }

  async generateCoursePlan(coursePlanConfig) {
    const service = new CourseService(this.studentId);
    this.course = await service.getCourse(this.courseId);
    this.input_query = this.course.dataValues.input_query;

    const onboardingCheckpoint = await service.getOnboardingCheckpoint(this.courseId);
    const onboardingCheckpointItems = await service.getCourseCheckpointItems(this.courseId, onboardingCheckpoint.dataValues.id);

    const messages = [
      { "role": "user", "content": "Hi, I want to learn something, but I am not able to figure out where to begin, or even what to actually learn, can you help me figure out what I should learn?" },
      { "role": "assistant", "content": "Sure, I will assist you. Please tell me what you want to learn, and I will ask you some follow-up questions ONE by ONE to help you figure this out." },
      { "role": "user", "content": this.input_query }
    ];

    onboardingCheckpointItems.forEach((entity) => {
      console.log('entity', entity);
      if (entity.entity_type === CheckpointItemTypes.QUESTION) {
        messages.push({
          "role": "assistant",
          "content": entity.question,
        });

        messages.push({
          "role": "user",
          "content": entity.Answer.answer,
        });
      }
    });

    messages.push(
      { "role": "assistant", "content": `I've got all the data I require. Here is the conversation summary: ${JSON.stringify(coursePlanConfig)}` },
      { "role": "user", "content": `Please generate the course plan.` },
    )

    console.log('messages', messages);

    const tools = courseCreationTools;
    const llm = new Anthropic();

    const response = await llm.ask(messages, tools, {
      system: `You'll be passed on user onboarding conversation and a summary. Generate a course plan for the user, which is an array of checkpoints required to complete the user's learning goal. You should fill this array with appropriate checkpoints, each containing a title, description, and estimated duration in hours. The checkpoints should cover all necessary steps to achieve the user's goal, and the total duration of all checkpoints should match the user's available time. Today is ${new Date().toString()}`
    });

    if (response.stop_reason === "tool_use") {
      const toolUse = response.content[response.content.length - 1];
      const toolName = toolUse.name;
      const toolInput = toolUse.input;

      if (toolName === "complete_course_onboarding") {
        console.log('complete_course_onboarding', toolInput);
        const { checkpoints = [] } = toolInput;
        const service = new CourseService(this.studentId);

        for (let i = 0; i < checkpoints.length; i++) {
          const checkpoint = checkpoints[i];
          const checkpointFromDB = await service.createCourseCheckpoint(this.courseId, {
            name: checkpoint.title,
            description: checkpoint.description,
            parentType: CheckpointParentTypes.COURSE,
            parentId: this.courseId,
            checkpointNumber: parseInt(checkpoint.chapter_number) + 1,
            checkpointType: CheckpointTypes.REGULAR,
            checkpointStatus: i === 0 ? CheckpointStatuses.UNLOCKED : CheckpointStatuses.LOCKED,
            meta: {
              chapter_number: checkpoint.chapter_number,
              duration_in_hours: checkpoint.duration_in_hours,
            }
          });
        }

        return {
          success: true,
          toolInput,
        }

      }
    }

    return {
      success: false,
      response,
    };
  }
}

module.exports = CoursePlanService;
