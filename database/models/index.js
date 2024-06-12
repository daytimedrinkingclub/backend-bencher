const Course = require("./Course");
const CourseMessage = require("./CourseMessage");
const CourseGoal = require("./CourseGoal");
const CourseQuestion = require("./CourseQuestion");
const User = require("./User");

Course.belongsTo(User, {foreignKey: "user_id"});
User.hasMany(Course, {foreignKey: "user_id"});

CourseGoal.belongsTo(Course, {foreignKey: "course_id"});
Course.hasMany(CourseGoal, {foreignKey: "course_id"});

CourseMessage.belongsTo(CourseGoal, {foreignKey: "course_goal_id"});
CourseGoal.hasMany(CourseMessage, {foreignKey: "course_goal_id"});

CourseQuestion.belongsTo(Course, {foreignKey: "course_id"});
Course.hasMany(CourseQuestion, {foreignKey: "course_id"});

module.exports = {
  Course,
  CourseMessage,
  CourseGoal,
  CourseQuestion,
  User,
};
