const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  patient_id: { type: String, required: true, unique: true },
  id_card: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  gender: { 
    type: String, 
    required: true, 
    enum: ["male", "female"] // Giới hạn giá trị hợp lệ
  },
  birth_date: { type: Date, required: true },
  phone: { type: String, required: true, unique: true },
  address: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Patient", patientSchema);