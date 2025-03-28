const Patient = require("../models/Patient");

// Tạo mã bệnh nhân tự động (PAT0001, PAT0002, ...)
const generatePatientId = async () => {
  const lastPatient = await Patient.findOne().sort({ createdAt: -1 });
  const lastId = lastPatient ? parseInt(lastPatient.patient_id.replace("PAT", ""), 10) : 0;
  return `PAT${String(lastId + 1).padStart(4, "0")}`;
};

// 1️⃣ Thêm bệnh nhân mới
exports.createPatient = async (req, res) => {
  try {
    const { id_card, name, gender, birth_date, phone, address } = req.body;
    const patient_id = await generatePatientId();

    const newPatient = new Patient({
      id_card,
      patient_id,
      name,
      gender,
      birth_date,
      phone,
      address,
    });

    await newPatient.save();

    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi thêm bệnh nhân", error: error.message });
  }
};

// 2️⃣ Tìm kiếm bệnh nhân theo id_card
exports.getPatientByIdCard = async (req, res) => {
  try {
    const { id_card } = req.params;
    const patient = await Patient.findOne({ id_card });

    if (!patient) {
      return res.status(404).json({ message: "Bệnh nhân không tồn tại" });
    }

    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tìm kiếm bệnh nhân", error: error.message });
  }
};


// 3️⃣ Lấy danh sách bệnh nhân
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách bệnh nhân", error: error.message });
  }
};

// 4️⃣ Lấy thông tin bệnh nhân theo ID
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: "Bệnh nhân không tồn tại" });

    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy bệnh nhân", error: error.message });
  }
};

// 5️⃣ Cập nhật thông tin bệnh nhân
exports.updatePatient = async (req, res) => {
  try {
    const { name, gender, birth_date, phone, address } = req.body;
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: "Bệnh nhân không tồn tại" });

    patient.name = name || patient.name;
    patient.gender = gender !== undefined ? gender : patient.gender;
    patient.birth_date = birth_date || patient.birth_date;
    patient.phone = phone || patient.phone;
    patient.address = address || patient.address;

    await patient.save();
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật bệnh nhân", error: error.message });
  }
};

// 6️⃣ Xóa bệnh nhân
exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) return res.status(404).json({ message: "Bệnh nhân không tồn tại" });

    res.json({ message: "Xóa bệnh nhân thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa bệnh nhân", error: error.message });
  }
};
