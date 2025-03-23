const mongoose = require("mongoose");

const medicineTypeSchema = new mongoose.Schema({
  medicine_type_code: {
    type: String,
    required: true,
    unique: true,
  },
  medicine_type_name: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("MedicineType", medicineTypeSchema);
