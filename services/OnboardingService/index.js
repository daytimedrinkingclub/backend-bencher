const onboardingTools = require('./onboarding_tools');
const Anthropic = require('../../llm/Anthropic');
const {Course} = require("../../database/models");
const {CheckpointItemTypes} = require("../../database/constants");
const CourseService = require("../CourseService");

class OnboardingService {
  constructor(studentId, courseId, checkpointId) {
    this.studentId = studentId;
    this.courseId = courseId;
    this.checkpointId = checkpointId;
  }

  async askOnboardingQuestion() {
    this.course = await Course.findOne({ where: { id: this.courseId, student_id: this.studentId } });
    this.input_query = this.course.dataValues.input_query;

    const service = new CourseService(this.studentId);
    const checkpointItems = await service.getCourseCheckpointItems(this.courseId, this.checkpointId);

    console.log('checkpointItems', checkpointItems);

    // return;
    const messages = [
      { "role": "user", "content": "Hi, I want to learn something, but I am not able to figure out where to begin, or even what to actually learn, can you help me figure out what I should learn?" },
      { "role": "assistant", "content": "Sure, I will assist you. Please tell me what you want to learn, and I will ask you some follow-up questions on by one to help you figure this out." },
      { "role": "user", "content": this.input_query }
    ];

    checkpointItems.forEach((entity) => {
      const rawAiResponse = entity.raw_ai_response;
      console.log('entity', entity);
      console.log('rawAiResponse', rawAiResponse);
      const toolUse = rawAiResponse.content[rawAiResponse.content.length - 1];
      if (entity.entity_type === CheckpointItemTypes.QUESTION) {
        messages.push({
          "role": "assistant",
          "content": rawAiResponse.content,
        });

        messages.push({
          "role": "user",
          "content": [
            {
              "type": "tool_result",
              "tool_use_id": toolUse.id,
              "content": entity.Answer.answer,
            }
          ]
        });
      }
    });

    const tools = onboardingTools;
    const llm = new Anthropic();

    const response = await llm.ask(messages, tools);

    if (response.stop_reason === "tool_use") {
      const toolUse = response.content[response.content.length - 1];
      const toolName = toolUse.name;
      const toolInput = toolUse.input;

      if (toolName === "get_user_data") {
        const { question_format: questionType, question_text: question, question_meta: rawMeta } = toolInput;
        const meta = typeof rawMeta === "string" ? JSON.parse(rawMeta) : rawMeta;

        const service = new CourseService(this.studentId);
        const { entity: questionItem, checkpointItem } = await service.createCheckpointItem(this.checkpointId, CheckpointItemTypes.QUESTION, {
          question,
          input_type: questionType,
          meta: meta,
          raw_ai_response: response,
        });

        return {
          success: true,
          question: questionItem,
          checkpointItem,
        }

      } else if (toolName === "generate_plan_summary") {
        return {
          success: true,
          onboardingComplete: true,
        }
      }
    }

    return {
      success: false,
      response,
    };
  }
}

module.exports = OnboardingService;
