const Registration = require("../models/Registration");


// Lấy tất cả phiếu khám của bác sĩ
exports.getDoctorRegistrations = async (req, res) => {
  try {
    const doctorId = req.user._id; // Lấy doctorId từ token
    const registrations = await Registration.find({ doctor_id: doctorId });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching registrations" });
  }
};


// Tạo đơn thuốc cho bệnh nhân
exports.createPrescription = async (req, res) => {
  try {
    const { patient_id, doctor_id, medicines, notes } = req.body;

    const prescription = new Prescription({
      patient_id,
      doctor_id,
      medicines,
      notes,
    });

    await prescription.save();
    res.status(201).json({ message: "Prescription created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating prescription" });
  }
};

// Lấy phiếu khám của bác sĩ dựa trên doctor_id
exports.getRegistrationsByDoctor = async (req, res) => {
  try {
    const doctorId = req.params.doctor_id;
    const registrations = await Registration.find({ doctor_id: doctorId });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching registrations for this doctor" });
  }
};
