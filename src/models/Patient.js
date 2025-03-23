const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  id_card: {
    type: String,
    required: true,
    unique: true,
  },
  patient_id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: Boolean, // true = Nam, false = Nữ
    required: true,
  },
  birth_date: {
    type: Date,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Patient", patientSchema);
