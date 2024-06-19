module.exports = [
  {
    "name": "get_user_data",
    "description": `Get the user data from the user, this includes the topics they want to learn, the duration they have, and the current skill level of the user. Today is ${new Date().toString()}`,
    "input_schema": {
      "type": "object",
      "properties": {
        "question_format": {
          "type": "string",
          "description": "The format of the question, and expected answer format, from only these options: text, radio, checkbox, scale, datepicker"
        },
        "question_text": {
          "type": "string",
          "description": "The actual question text string that the user will be asked, this should be a question that the user will be asked to answer, and the question should be in the format of a question that the user will be asked to answer"
        },
        "question_meta": {
          "type": "object",
          "description": "Additional metadata based on the question_format",
          "oneOf": [
            {
              "properties": {
                "options": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "An array of options for radio and checkbox question_format"
                }
              },
              "required": ["options"]
            },
            {
              "properties": {
                "min": {
                  "type": "number",
                  "description": "The minimum value for the scale question_format"
                },
                "max": {
                  "type": "number",
                  "description": "The maximum value for the scale question_format"
                }
              },
              "required": ["min", "max"]
            },
            {
              "properties": {}
            }
          ]
        },
        "answer_type": {
          "type": "string",
          "description": "The expected answer type, text, radio, checkbox, scale, datepicker"
        },
        "answer_values": {
          "type": "string",
          "description": "The expected answer values, for radio and checkbox answer type, comma separated options will work, additionally some questions might not and answer like if we ask the users age, only answer type scale is enough for such questions the key NULL can be passed"
        }
      },
      "required": ["question_format", "question_text", "question_meta", "answer_type", "answer_values"]
    }
  },
  {
    "name": "generate_plan_summary",
    "description": "Generate a plan summary for the user to understand what they are learning and what they are aiming to achieve, with the things you think are important the topic names etc",
    "input_schema": {
      "type": "object",
      "properties": {
        "plan_overview": {
          "type": "string",
          "description": "The overview of the plan, a general description of what the user wants to learn"
        },
        "learning_goal": {
          "type": "string",
          "description": "Details on why the user wants to learn a particular topic, as this impacts the course plan python for school kids and python for a senior developer interview are different for example"
        },
        "deadline": {
          "type": "string",
          "description": "The deadline date before which user has to learn the topic, this is in date, respond with a date provided by the user"
        },
        "current_skill_level": {
          "type": "string",
          "description": "The current skill level of the user, this is on a scale of 1-10, 1 being the lowest and 10 being the highest"
        }
      },
      "required": ["plan_overview", "learning_goal", "deadline", "current_skill_level"]
    }
  }
]
