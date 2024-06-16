const onboardingTools = require('./onboarding_tools');
const Anthropic = require('../../llm/Anthropic');
const {Course} = require("../../database/models");
const { createCheckpointItem, getCourseCheckpointItems} = require("./utils");
const {CheckpointItemTypes} = require("../../database/constants");

class OnboardingService {
  constructor(studentId, courseId, checkpointId) {
    this.studentId = studentId;
    this.courseId = courseId;
    this.checkpointId = checkpointId;
  }

  async askOnboardingQuestion() {
    this.course = await Course.findOne({ where: { id: this.courseId, student_id: this.studentId } });
    this.input_query = this.course.dataValues.input_query;

    const checkpointItems = await getCourseCheckpointItems(this.courseId, this.checkpointId);

    console.log('checkpointItems', checkpointItems);

    // return;
    const messages = [
      { "role": "user", "content": "Hi, I want to learn something, but I am not able to figure out where to begin, or even what to actually learn, can you help me figure out what I should learn?" },
      { "role": "assistant", "content": "Sure, I will assist you. Please tell me what you want to learn, and I will ask you some follow-up questions on by one to help you figure this out." },
      { "role": "user", "content": this.input_query }
    ];

    const tools = onboardingTools;
    const llm = new Anthropic();

    const response = await llm.ask(messages, tools);
    console.log('response', JSON.stringify(response));

    if (response.stop_reason === "tool_use") {
      const toolUse = response.content[response.content.length - 1];
      const toolName = toolUse.name;
      const toolInput = toolUse.input;
      console.log(`======Claude wants to use the ${toolName} tool======`);
      console.log(`Tool Input: ${JSON.stringify(toolInput, null, 2)}`);

      if (toolName === "get_user_data") {
        const { question_format: questionType, question_text: question, question_meta: rawMeta } = toolInput;
        const meta = typeof rawMeta === "string" ? JSON.parse(rawMeta) : rawMeta;

        const { entity: questionItem, checkpointItem } = await createCheckpointItem(this.checkpointId, CheckpointItemTypes.QUESTION, {
          question,
          input_type: questionType,
          meta: meta,
        });

        return {
          question: questionItem,
          checkpointItem,
        }

      } else if (toolName === "generate_plan_summary") {
        return {
          onboardingComplete: true,
        }
      }
    }


    return response;
  }
}

module.exports = OnboardingService;
