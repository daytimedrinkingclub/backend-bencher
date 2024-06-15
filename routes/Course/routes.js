const CourseService = require("../../services/CourseService");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { query } = req.body;
  const { student_id } = req.student;
  const service = new CourseService(student_id);
  const response = await service.createCourse(query);

  res.json(response);
});

router.get("/:course_id", async (req, res) => {
  const { course_id } = req.params;
  const { student_id } = req.student;
  console.log('student_id', student_id);
  console.log('course_id', course_id);
  const service = new CourseService(student_id);
  const course = await service.getCourse(course_id);

  if (course) {
    return res.json(course);
  }

  return res.sendStatus(404);
});

module.exports = router;
