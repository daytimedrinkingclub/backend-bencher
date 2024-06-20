module.exports = [
  {
    "name": "complete_course_onboarding",
    "description": "This function completes the course onboarding by passing on an array of checkpoints required to complete the user's learning goal. You should fill this array with appropriate checkpoints, each containing a title, description, and estimated duration in hours. The checkpoints should cover all necessary steps to achieve the user's goal, and the total duration of all checkpoints should match the user's available time.",
    "input_schema": {
      "type": "object",
      "properties": {
        "checkpoints": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "chapter_number": {
                "type": "string",
                "description": "Starting chapter is 1. There is no limit on how many chapters can be there, but the chapter number should be in sequence."
              },
              "title": {
                "type": "string",
                "description": "Main title of the checkpoint"
              },
              "description": {
                "type": "string",
                "description": "Brief description of the checkpoint"
              },
              "duration_in_hours": {
                "type": "number",
                "description": "Estimated time in hours to complete this checkpoint"
              }
            },
            "required": ["chapter_number", "title", "description", "duration"]
          }
        }
      },
      "required": ["checkpoints"]
    }
  }
]
