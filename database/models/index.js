const { sequelize, Sequelize } = require("../db");
const Course = require("./Course");
const Message = require("./Message");
const Checkpoint = require("./Checkpoint");
const Question = require("./Question");
const Student = require("./Student");
const Answer = require("./Answer");
const Content = require("./Content");
const StudentPlan = require("./StudentPlan");
const AnswerAnalysis = require("./AnswerAnalysis");
const CheckpointItem = require("./CheckpointItem");
const Plan = require("./Plan");

Course.belongsTo(Student, {foreignKey: "student_id"});
Student.hasMany(Course, {foreignKey: "student_id"});

Course.hasMany(Checkpoint, {
  foreignKey: 'parent_id',
  constraints: false,
  scope: {
    parent_type: 'Course'
  }
});
Checkpoint.hasMany(Checkpoint, {
  foreignKey: 'parent_id',
  constraints: false,
  scope: {
    parent_type: 'Checkpoint'
  }
});
Checkpoint.hasMany(CheckpointItem, {
  foreignKey: 'checkpoint_id',
});
Checkpoint.belongsTo(Course, {
  foreignKey: 'parent_id',
  constraints: false,
  scope: {
    parent_type: 'Course'
  }
});
Checkpoint.belongsTo(Checkpoint, {
  foreignKey: 'parent_id',
  constraints: false,
  scope: {
    parent_type: 'Checkpoint'
  }
});

Question.belongsTo(CheckpointItem, {
  foreignKey: 'entity_id',
  constraints: false,
  scope: {
    entity_type: 'Checkpoint'
  }
});

Content.belongsTo(CheckpointItem, {
  foreignKey: 'entity_id',
  constraints: false,
  scope: {
    entity_type: 'checkpoint'
  }
});

Answer.belongsTo(Question, {foreignKey: "question_id"});
Question.hasOne(Answer, {foreignKey: "question_id"});

AnswerAnalysis.belongsTo(Answer, {foreignKey: "answer_id"});
Answer.hasOne(AnswerAnalysis, {foreignKey: "answer_id"});

Plan.belongsTo(Student, {foreignKey: "student_id"});
Student.hasOne(Plan, {foreignKey: "student_id"});

Student.hasMany(StudentPlan, { foreignKey: 'student_id' });
StudentPlan.belongsTo(Student, { foreignKey: 'student_id' });

Plan.hasMany(StudentPlan, { foreignKey: 'plan_id' });
StudentPlan.belongsTo(Plan, { foreignKey: 'plan_id' });

module.exports = {
  Course,
  Message,
  Checkpoint,
  Question,
  Student,
  Plan,
  Answer,
  Content,
  AnswerAnalysis,
  CheckpointItem,
  Sequelize,
  sequelize,
};
