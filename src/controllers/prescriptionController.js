const Prescription = require('../models/Prescription');
const Patient = require('../models/Patient');
const Medicine = require('../models/medicine');

// Tạo đơn thuốc (đã có)
exports.createPrescription = async (req, res) => {
  try {
    const { patient_id, registration_id, doctor_id, medicines, notes } = req.body;

    if (!patient_id || !registration_id || !doctor_id || !medicines) {
      return res.status(400).json({ message: 'Thiếu các trường bắt buộc' });
    }

    const patient = await Patient.findById(patient_id);
    if (!patient) {
      return res.status(404).json({ message: 'Không tìm thấy bệnh nhân' });
    }

    const updatedMedicines = await Promise.all(medicines.map(async (med) => {
      const medicine = await Medicine.findById(med.medicine_id).populate('medicine_type_id');
      if (!medicine) {
        throw new Error(`Không tìm thấy thuốc với ID: ${med.medicine_id}`);
      }
      return {
        medicine_id: medicine._id,
        name: medicine.medicine_name,
        medicine_type: medicine.medicine_type_id._id,
        dosage: med.dosage,
        quantity: med.quantity,
        price: medicine.price
      };
    }));

    const newPrescription = new Prescription({
      patient_id,
      patient_name: patient.name,
      registration_id,
      doctor_id,
      medicines: updatedMedicines,
      notes
    });

    await newPrescription.save();
    res.status(201).json({ message: 'Tạo đơn thuốc thành công', prescription: newPrescription });
  } catch (error) {
    console.error('Lỗi tạo đơn thuốc:', error);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// Lấy danh sách đơn thuốc
exports.getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find()
      .populate('patient_id', 'name') // Lấy tên bệnh nhân
      .populate('doctor_id', 'name')  // Lấy tên bác sĩ
      .populate({
        path: 'medicines.medicine_id',
        select: 'medicine_name price' // Lấy tên và giá thuốc
      });
    res.status(200).json(prescriptions);
  } catch (error) {
    console.error('Lỗi lấy danh sách đơn thuốc:', error);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// Lấy chi tiết một đơn thuốc theo ID
exports.getPrescriptionById = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate('patient_id', 'name')
      .populate('doctor_id', 'name')
      .populate({
        path: 'medicines.medicine_id',
        select: 'medicine_name price'
      });

    if (!prescription) {
      return res.status(404).json({ message: 'Không tìm thấy đơn thuốc' });
    }

    res.status(200).json(prescription);
  } catch (error) {
    console.error('Lỗi lấy chi tiết đơn thuốc:', error);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// Sửa đơn thuốc theo ID
exports.updatePrescription = async (req, res) => {
  try {
    const { patient_id, registration_id, doctor_id, medicines, notes } = req.body;

    const prescription = await Prescription.findById(req.params.id);
    if (!prescription) {
      return res.status(404).json({ message: 'Không tìm thấy đơn thuốc' });
    }

    if (patient_id) {
      const patient = await Patient.findById(patient_id);
      if (!patient) {
        return res.status(404).json({ message: 'Không tìm thấy bệnh nhân' });
      }
      prescription.patient_id = patient_id;
      prescription.patient_name = patient.name;
    }

    if (registration_id) prescription.registration_id = registration_id;
    if (doctor_id) prescription.doctor_id = doctor_id;

    if (medicines) {
      const updatedMedicines = await Promise.all(medicines.map(async (med) => {
        const medicine = await Medicine.findById(med.medicine_id).populate('medicine_type_id');
        if (!medicine) {
          throw new Error(`Không tìm thấy thuốc với ID: ${med.medicine_id}`);
        }
        return {
          medicine_id: medicine._id,
          name: medicine.medicine_name,
          medicine_type: medicine.medicine_type_id._id,
          dosage: med.dosage,
          quantity: med.quantity,
          price: medicine.price
        };
      }));
      prescription.medicines = updatedMedicines;
    }

    if (notes !== undefined) prescription.notes = notes;

    await prescription.save();
    res.status(200).json({ message: 'Cập nhật đơn thuốc thành công', prescription });
  } catch (error) {
    console.error('Lỗi cập nhật đơn thuốc:', error);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// Xóa đơn thuốc theo ID
exports.deletePrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndDelete(req.params.id);
    if (!prescription) {
      return res.status(404).json({ message: 'Không tìm thấy đơn thuốc' });
    }
    res.status(200).json({ message: 'Xóa đơn thuốc thành công' });
  } catch (error) {
    console.error('Lỗi xóa đơn thuốc:', error);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};