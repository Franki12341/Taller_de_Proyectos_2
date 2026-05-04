const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    teacherCode: { type: String, required: true },
    requiredHours: { type: Number, required: true, min: 1 },
    enrollment: { type: Number, required: true, min: 1 },
    type: {
      type: String,
      enum: ["theory", "lab"],
      default: "theory"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
