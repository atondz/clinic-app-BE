const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  patient_name: { type: String, required: true },
  registration_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Registration', required: true },
  doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  medicines: [
    {
      medicine_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
      name: { type: String, required: true },
      medicine_type: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicineType', required: true },
      dosage: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  notes: { type: String },
  total_price: { type: Number, default: 0 },
  date_created: { type: Date, default: Date.now }
});

prescriptionSchema.pre('save', function(next) {
  this.total_price = this.medicines.reduce((total, med) => {
    return total + (med.price * med.quantity);
  }, 0);
  next();
});

module.exports = mongoose.model('Prescription', prescriptionSchema);