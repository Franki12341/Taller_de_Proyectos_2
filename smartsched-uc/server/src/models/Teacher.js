const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema(
  {
    day: { type: String, required: true },
    start: { type: String, required: true },
    end: { type: String, required: true }
  },
  { _id: false }
);

const teacherSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    specialties: [{ type: String, required: true }],
    availability: [availabilitySchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", teacherSchema);
