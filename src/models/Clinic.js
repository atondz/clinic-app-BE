// models/Clinic.js
const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
}, {
  timestamps: true // tương đương createdAt, updatedAt
});

module.exports = mongoose.model("Clinic", clinicSchema);
