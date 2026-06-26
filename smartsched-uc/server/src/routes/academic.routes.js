const express = require("express");
const simpleCache = require("../middlewares/simpleCache.middleware");
const {
  createAuditLog,
  debugSchema,
  generateAcademicSchedule,
  healthcheck,
  listAuditLogs,
  listClassrooms,
  listConstraints,
  listCourses,
  listTeachers,
  listTimeBlocks,
  validateAcademicSchedule
} = require("../controllers/academic.controller");

const router = express.Router();

router.get("/health", healthcheck);
router.get("/debug/schema", debugSchema);
router.get("/audit/logs", listAuditLogs);
router.get("/teachers", simpleCache(60), listTeachers);
router.get("/courses", simpleCache(60), listCourses);
router.get("/classrooms", simpleCache(60), listClassrooms);
router.get("/time-blocks", simpleCache(60), listTimeBlocks);
router.get("/constraints", simpleCache(60), listConstraints);

router.post("/schedules/generate", generateAcademicSchedule);
router.post("/schedules/validate", validateAcademicSchedule);
router.post("/audit/logs", createAuditLog);

module.exports = router;
