const mongoose = require("mongoose");
const Classroom = require("../models/Classroom");
const Course = require("../models/Course");
const Teacher = require("../models/Teacher");
const { classrooms, courses, teachers } = require("../data/academic.seed");

async function seed() {
  if (!process.env.MONGODB_URI) {
    throw new Error("Define MONGODB_URI antes de ejecutar npm run seed.");
  }

  await mongoose.connect(process.env.MONGODB_URI);

  await Promise.all([Teacher.deleteMany({}), Course.deleteMany({}), Classroom.deleteMany({})]);
  await Promise.all([Teacher.insertMany(teachers), Course.insertMany(courses), Classroom.insertMany(classrooms)]);

  await mongoose.disconnect();
  console.log("Dataset academico cargado en MongoDB.");
}

seed().catch(async (error) => {
  console.error(error.message);
  await mongoose.disconnect();
  process.exit(1);
});
