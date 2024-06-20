const ChapterService = require("../../services/ChapterService");
const express = require("express");
const router = express.Router();

router.get("/:entity_type/:entity_id/chapters", async (req, res) => {
  const { entity_type, entity_id } = req.params;
  const { student_id } = req.student;

  const service = new ChapterService(student_id);
  const chapters = await service.getChapters(entity_type, entity_id);

  return res.json(chapters);
});

module.exports = router;
