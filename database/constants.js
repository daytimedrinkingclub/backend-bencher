const CourseQuestionInputTypes = {
  TEXT: "text",
  RADIO: "radio",
  CHECKBOX: "checkbox",
  SCALE: "scale",
  DATE: "date",
}

const CheckpointItemTypes = {
  INFORMATION: "information",
  QUESTION: "question",
  ANSWER: "answer",
  DOUBT: "doubt",
  NOTES: "notes",
}

const CourseMessageUserTypes = {
  USER: "user",
  ASSISTANT: "assistant",
  SYSTEM: "system",
}

module.exports = {
  CourseMessageUserTypes,
  CheckpointItemTypes,
  CourseQuestionInputTypes,
};
