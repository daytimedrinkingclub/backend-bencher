const {Answer, CheckpointItem, Checkpoint, Course, Question} = require("../../database/models");
const {Sequelize} = require("sequelize");

class QuestionService {
  constructor(studentId, questionId) {
    this.studentId = studentId;
    this.questionId = questionId;
  }

  async getQuestion() {
    const question = await Question.findOne({
      where: { id: this.questionId },
      include: [
        Answer,
        {
          model: CheckpointItem,
          include: [
            {
              model: Checkpoint,
              include: [
                {
                  model: Course,
                  where: { student_id: this.studentId },
                },
              ],
            },
          ],
        },
      ],
    });

    return question;
  }

  async answerQuestion(answer) {
    const question = await this.getQuestion();

    if (!question) {
      throw new Error(`Question with ID ${this.questionId} not found.`);
    }

    if (question.Answer) {
      throw new Error(`Question with ID ${this.questionId} already answered.`);
    }

    const newAnswer = await Answer.create({
      question_id: this.questionId,
      answer: answer,
    });

    return newAnswer;
  }
}

module.exports = QuestionService;
