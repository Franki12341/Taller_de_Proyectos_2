const mongoose = require("mongoose");

const classroomSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    capacity: { type: Number, required: true, min: 1 },
    type: {
      type: String,
      enum: ["theory", "lab"],
      default: "theory"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Classroom", classroomSchema);
