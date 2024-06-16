const express = require("express");
const router = express.Router();
const QuestionService = require("../../services/QuestionService");

router.get("/:question_id", async (req, res) => {
  const { question_id } = req.params;
  const { student_id } = req.student;
  const service = new QuestionService(student_id, question_id);
  const response = await service.getQuestion();

  res.json(response);
});

router.post("/:question_id/answer", async (req, res) => {
  const { answer } = req.body;
  const { question_id } = req.params;
  const { student_id } = req.student;
  const service = new QuestionService(student_id, question_id);
  const response = await service.answerQuestion(answer);

  res.json(response);
});

module.exports = router;
