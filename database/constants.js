const CourseQuestionInputTypes = {
  TEXT: "text",
  RADIO: "radio",
  CHECKBOX: "checkbox",
  SCALE: "scale",
  DATE: "datepicker",
}

const CheckpointItemTypes = {
  CONTENT: "Content",
  QUESTION: "Question",
  ANSWER: "Answer",
  DOUBT: "Doubt",
  NOTE: "Note",
}

const CourseMessageUserTypes = {
  USER: "user",
  ASSISTANT: "assistant",
  SYSTEM: "system",
}

const CourseStatuses = {
  ONGOING: "ongoing",
  COMPLETED: "completed",
}

const CheckpointTypes = {
  ONBOARDING: "onboarding",
  REGULAR: "regular",
};

const CheckpointStatuses = {
  LOCKED: "locked",
  UNLOCKED: "unlocked",
  COMPLETED: "completed",
}

module.exports = {
  CourseMessageUserTypes,
  CheckpointItemTypes,
  CourseQuestionInputTypes,
  CourseStatuses,
  CheckpointTypes,
  CheckpointStatuses,
};
