// models/Registration.js

const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  medical_code: {
    type: String,
    required: true,
    unique: true, // 8 số, ví dụ: "00000001"
  },
  order_number: {
    type: Number,
    required: true,
  },
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  clinic_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clinic",
    required: true,
  },
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Lưu ý: user có role: 'doctor'
    required: true,
  },
  registration_date: {
    type: Date,
    default: Date.now,
  },
  priority: {
    type: Boolean,
    default: false,
  },
  symptoms: {
    type: String,
  },
  note: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Registration", registrationSchema);
