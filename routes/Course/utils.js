const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { query } = req.body;
  const course = await Course.create({ name, description, courseId });
  res.json(course);
})
