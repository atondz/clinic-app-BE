const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  registration_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Registration', required: true },
  doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  medicines: [
    {
      name: { type: String, required: true }, // Tên thuốc
      dosage: { type: String, required: true } // Liều lượng
    }
  ],
  notes: { type: String }, // Ghi chú
  date_created: { type: Date, default: Date.now } // Ngày tạo
});

module.exports = mongoose.model('Prescription', prescriptionSchema);