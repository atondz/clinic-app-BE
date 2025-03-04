const Patient = require("../models/Patient");

// Tạo mã bệnh nhân tự động (PAT0001, PAT0002, ...)
const generatePatientId = async () => {
  const lastPatient = await Patient.findOne({ order: [["id", "DESC"]] });
  const lastId = lastPatient ? parseInt(lastPatient.patient_id.replace("PAT", ""), 10) : 0;
  return `PAT${String(lastId + 1).padStart(4, "0")}`;
};

// 1️⃣ Thêm bệnh nhân mới
exports.createPatient = async (req, res) => {
  try {
    const { id_card, name, gender, birth_date, phone, address } = req.body;
    const patient_id = await generatePatientId();

    const newPatient = await Patient.create({
      id_card,
      patient_id,
      name,
      gender,
      birth_date,
      phone,
      address,
    });

    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi thêm bệnh nhân", error });
  }
};

//  Tìm kiếm bệnh nhân theo id_card
exports.getPatientByIdCard = async (req, res) => {
  try {
    const { id_card } = req.params;
    const patient = await Patient.findOne({ where: { id_card } });

    if (!patient) {
      return res.status(404).json({ message: "Bệnh nhân không tồn tại" });
    }

    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tìm kiếm bệnh nhân", error });
  }
};

// 2️⃣ Lấy danh sách bệnh nhân
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách bệnh nhân", error });
  }
};

// 3️⃣ Lấy thông tin bệnh nhân theo ID
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) return res.status(404).json({ message: "Bệnh nhân không tồn tại" });

    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy bệnh nhân", error });
  }
};

// 4️⃣ Cập nhật thông tin bệnh nhân
exports.updatePatient = async (req, res) => {
  try {
    const { name, gender, birth_date, phone, address } = req.body;
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) return res.status(404).json({ message: "Bệnh nhân không tồn tại" });

    await patient.update({ name, gender, birth_date, phone, address });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật bệnh nhân", error });
  }
};

// 5️⃣ Xóa bệnh nhân
exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) return res.status(404).json({ message: "Bệnh nhân không tồn tại" });

    await patient.destroy();
    res.json({ message: "Xóa bệnh nhân thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa bệnh nhân", error });
  }
};
