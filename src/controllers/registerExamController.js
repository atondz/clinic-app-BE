// controllers/registerExamController.js

const Patient = require("../models/Patient");
const Registration = require("../models/Registration");

// Hàm sinh mã khám 8 số
const generateMedicalCode = async () => {
  const last = await Registration.findOne({}).sort({ createdAt: -1 });
  const lastNum = last ? parseInt(last.medical_code) : 0;
  return String(lastNum + 1).padStart(8, "0");
};

// Hàm tính số thứ tự (ưu tiên hoặc thường)
const getOrderNumber = async (clinic_id, priority) => {
  if (priority) return 1;
  const count = await Registration.countDocuments({ clinic_id });
  return count + 1;
};

// Đăng ký khám
exports.createRegistration = async (req, res) => {
  try {
    const {
      isNewPatient,
      patientData,
      selectedPatientId,
      clinic_id,
      doctor_id,
      priority,
      symptoms,
      note,
    } = req.body;

    let patientId;

    if (isNewPatient) {
      // Kiểm tra xem ID_card đã tồn tại chưa
      const existingPatient = await Patient.findOne({ id_card: patientData.id_card });
      if (existingPatient) {
        return res.status(400).json({
          message: "Bệnh nhân với ID_card này đã tồn tại. Vui lòng sử dụng bệnh nhân hiện có.",
          patientId: existingPatient._id,
        });
      }

      const lastPatient = await Patient.findOne().sort({ createdAt: -1 });
      const newIdNum = lastPatient
        ? parseInt(lastPatient.patient_id.replace("PAT", "")) + 1
        : 1;
      const patient_id = `PAT${String(newIdNum).padStart(4, "0")}`;

      // Không cần chuyển đổi gender nữa vì model đã chấp nhận chuỗi
      const newPatient = new Patient({ ...patientData, patient_id });
      const savedPatient = await newPatient.save();
      patientId = savedPatient._id;
    } else {
      patientId = selectedPatientId;
      if (!patientId) {
        return res.status(400).json({ message: "Vui lòng cung cấp patient_id cho bệnh nhân hiện có." });
      }
    }

    const medical_code = await generateMedicalCode();
    const order_number = await getOrderNumber(clinic_id, priority);

    if (priority) {
      await Registration.updateMany(
        { clinic_id },
        { $inc: { order_number: 1 } }
      );
    }

    const registration = new Registration({
      medical_code,
      order_number,
      patient_id: patientId,
      clinic_id,
      doctor_id,
      priority,
      symptoms,
      note,
    });

    await registration.save();

    res.status(201).json({ message: "Đăng ký khám thành công" });
  } catch (error) {
    console.error("Đăng ký khám thất bại:", error);
    if (error.code === 11000) { // Lỗi trùng lặp từ MongoDB
      res.status(400).json({ message: "Bệnh nhân với ID_card hoặc số điện thoại này đã tồn tại." });
    } else if (error.name === "ValidationError") {
      res.status(400).json({ message: "Dữ liệu không hợp lệ", errors: error.errors });
    } else {
      res.status(500).json({ message: "Lỗi server", error: error.message });
    }
  }
};

// Các hàm khác giữ nguyên
exports.getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate('patient_id')
      .populate('clinic_id')
      .populate('doctor_id');
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

exports.findByIdCard = async (req, res) => {
  try {
    const { id_card } = req.params;
    const patient = await Patient.findOne({ id_card });
    if (!patient) return res.status(404).json({ message: "Không tìm thấy bệnh nhân" });

    const registrations = await Registration.find({ patient_id: patient._id })
      .populate('clinic_id')
      .populate('doctor_id');
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

exports.findByPatientName = async (req, res) => {
  try {
    const { name } = req.params;
    const patients = await Patient.find({ name: new RegExp(name, 'i') });
    const patientIds = patients.map(p => p._id);

    const registrations = await Registration.find({ patient_id: { $in: patientIds } })
      .populate('clinic_id')
      .populate('doctor_id');
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

exports.updateRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Registration.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

exports.deleteRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    await Registration.findByIdAndDelete(id);
    res.status(200).json({ message: "Xoá đăng ký thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};