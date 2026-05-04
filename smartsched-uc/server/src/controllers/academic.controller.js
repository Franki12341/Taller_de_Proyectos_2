const mongoose = require("mongoose");
const Classroom = require("../models/Classroom");
const Course = require("../models/Course");
const Schedule = require("../models/Schedule");
const Teacher = require("../models/Teacher");
const { generateSchedule, getDefaultDataset, validateSchedule } = require("../services/scheduler.service");

async function getDataset() {
  if (mongoose.connection.readyState !== 1) {
    return getDefaultDataset();
  }

  const [teachers, courses, classrooms] = await Promise.all([
    Teacher.find().lean(),
    Course.find().lean(),
    Classroom.find().lean()
  ]);

  if (teachers.length === 0 || courses.length === 0 || classrooms.length === 0) {
    return getDefaultDataset();
  }

  return { teachers, courses, classrooms };
}

async function listTeachers(req, res) {
  const { teachers } = await getDataset();
  res.json(teachers);
}

async function listCourses(req, res) {
  const { courses } = await getDataset();
  res.json(courses);
}

async function listClassrooms(req, res) {
  const { classrooms } = await getDataset();
  res.json(classrooms);
}

async function generateAcademicSchedule(req, res) {
  const dataset = req.body && req.body.courses ? req.body : await getDataset();
  const result = generateSchedule(dataset);

  if (mongoose.connection.readyState === 1 && result.validation.valid) {
    await Schedule.create({
      name: req.body.name || `Generacion ${new Date().toISOString()}`,
      items: result.items,
      metrics: result.metrics,
      valid: result.validation.valid,
      issues: result.validation.issues
    });
  }

  res.status(result.validation.valid ? 201 : 422).json(result);
}

async function validateAcademicSchedule(req, res) {
  const dataset = req.body && req.body.teachers ? req.body : await getDataset();
  const result = validateSchedule({
    items: req.body.items || [],
    teachers: dataset.teachers,
    courses: dataset.courses,
    classrooms: dataset.classrooms
  });

  res.status(result.valid ? 200 : 422).json(result);
}

module.exports = {
  generateAcademicSchedule,
  listClassrooms,
  listCourses,
  listTeachers,
  validateAcademicSchedule
};
