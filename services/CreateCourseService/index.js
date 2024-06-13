import {Checkpoint, Course} from "../../database/models";
import {CheckpointStatuses, CourseStatuses} from "../../database/constants";
import onboardingTools from "./onboarding_tools";
import Anthropic from "../../llm/Anthropic";

class CreateCourseService {
  constructor(studentId, query, config = {}) {
    this.studentId = studentId;
    this.query = query;
    this.config = config;
  }

  async createCourse() {
    const course = await Course.create({
      student_id: this.studentId,
      input_query: this.query,
      course_status: CourseStatuses.ONGOING,
    });

    const onboardingCheckpoint = await Checkpoint.create({
      parent_id: course.id,
      parent_type: "Course",
      name: "Onboarding",
      description: "This is the onboarding checkpoint",
      checkpoint_number: 1,
      checkpoint_status: CheckpointStatuses.UNLOCKED,
    });

    const messages = [
      { "role": "user", "content": "Hi, I want to learn something, but I am not able to figure out where to begin, or even what to actually learn, can you help me figure out what I should learn?" },
      { "role": "assistant", "content": "Sure, I will assist you. Please tell me what you want to learn, and I will ask you some follow-up questions to help you figure this out." },
      { "role": "user", "content": this.query }
    ];

    const tools = onboardingTools;

    const LLM = new Anthropic();

    const response = await LLM.ask(messages, tools);

    console.log('LLM response', response);

    this.course = course;
    return {
      course,
    };
  }
}

module.exports = CreateCourseService;
