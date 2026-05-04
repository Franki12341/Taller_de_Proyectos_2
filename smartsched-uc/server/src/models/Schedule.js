const mongoose = require("mongoose");

const scheduleItemSchema = new mongoose.Schema(
  {
    courseCode: { type: String, required: true },
    courseName: { type: String, required: true },
    teacherCode: { type: String, required: true },
    teacherName: { type: String, required: true },
    classroomCode: { type: String, required: true },
    day: { type: String, required: true },
    start: { type: String, required: true },
    end: { type: String, required: true },
    duration: { type: Number, required: true },
    enrollment: { type: Number, required: true }
  },
  { _id: false }
);

const scheduleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    items: [scheduleItemSchema],
    metrics: {
      classroomEfficiency: Number,
      balanceScore: Number,
      idlePenalty: Number,
      assignedCourses: Number
    },
    valid: { type: Boolean, default: false },
    issues: [{ type: String }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Schedule", scheduleSchema);
