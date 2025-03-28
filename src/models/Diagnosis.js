const mongoose = require('mongoose');

const diagnosisSchema = new mongoose.Schema({
  patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  primary_diagnosis: { type: String, required: true },
  symptoms: { type: [String], required: true },
  test_results: { type: String },
  current_condition: { type: String },
  treatment_advice: { type: String },
  prescription_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Prescription' },
}, { timestamps: { createdAt: 'date_created', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Diagnosis', diagnosisSchema);