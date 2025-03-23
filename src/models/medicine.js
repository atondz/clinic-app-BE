const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  medicine_code: {
    type: String,
    required: true,
    unique: true,
  },
  medicine_name: {
    type: String,
    required: true,
  },
  medicine_type_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MedicineType",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Medicine", medicineSchema);
