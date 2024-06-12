//"radio", "checkbox", "scale", "date"

export const CourseQuestionInputTypes = {
  TEXT: "text",
  RADIO: "radio",
  CHECKBOX: "checkbox",
  SCALE: "scale",
  DATE: "date",
}

// message_type: {
//   type: DataTypes.ENUM("information", "gather_requirement", "quiz", "doubt"),
//     allowNull: false,
// },
// user_type: {
//   type: DataTypes.ENUM("user", "assistant", "system"),
//     allowNull: false,
// },
// convert above two into the object CourseQuestionInputTypes
export const CourseMessageTypes = {
  INFORMATION: "information",
  GATHER_REQUIREMENT: "gather_requirement",
  QUIZ: "quiz",
  DOUBT: "doubt",
}

export const CourseMessageUserTypes = {
  USER: "user",
  ASSISTANT: "assistant",
  SYSTEM: "system",
}
