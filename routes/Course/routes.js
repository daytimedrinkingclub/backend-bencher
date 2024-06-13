import CreateCourseService from "../../services/CreateCourseService";
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { query } = req.body;
  const service = new CreateCourseService(1, query);
  const response = await service.createCourse();


  console.log('response', response);
  res.json(response);
})

module.exports = router;
