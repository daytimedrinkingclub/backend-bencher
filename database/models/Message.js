// const {sequelize, Model, DataTypes} = require("../db");
// const Course = require("./Course");
// const {CourseMessageUserTypes, CourseMessageTypes} = require("../constants");
//
// class Message extends Model {
// }
//
// Message.init(
//   {
//     id: {
//       type: DataTypes.UUID,
//       primaryKey: true,
//       defaultValue: DataTypes.UUIDV4,
//     },
//     course_id: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       references: {
//         model: Course,
//         key: 'id',
//       },
//     },
//     sequence_number: {
//       type: DataTypes.STRING(36),
//       allowNull: false,
//     },
//     message: {
//       type: DataTypes.TEXT,
//     },
//     user_type: {
//       type: DataTypes.ENUM(Object.values(CourseMessageUserTypes))
//     },
//     message_type: {
//       type: DataTypes.ENUM(Object.values(CourseMessageTypes)),
//     },
//     raw_message: {
//       type: DataTypes.JSON,
//     },
//   },
//   {sequelize},
// );
//
// module.exports = Message;
