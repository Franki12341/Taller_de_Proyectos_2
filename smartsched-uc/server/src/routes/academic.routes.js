const express = require("express");
const {
  generateAcademicSchedule,
  listClassrooms,
  listCourses,
  listTeachers,
  validateAcademicSchedule
} = require("../controllers/academic.controller");

const router = express.Router();

router.get("/teachers", listTeachers);
router.get("/courses", listCourses);
router.get("/classrooms", listClassrooms);
router.post("/schedules/generate", generateAcademicSchedule);
router.post("/schedules/validate", validateAcademicSchedule);

module.exports = router;
