const MedicineType = require("../models/medicineType");

// Thêm loại thuốc
const createMedicineType = async (req, res) => {
  try {
    const { medicine_type_code, medicine_type_name } = req.body;

    if (!medicine_type_code || !medicine_type_name) {
      return res.status(400).json({ message: "Vui lòng cung cấp đầy đủ mã và tên loại thuốc" });
    }

    const newMedicineType = await MedicineType.create({
      medicine_type_code,
      medicine_type_name,
    });

    res.status(201).json({ message: "Thêm loại thuốc thành công", data: newMedicineType });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Sửa loại thuốc
const updateMedicineType = async (req, res) => {
  try {
    const { id } = req.params;
    const { medicine_type_code, medicine_type_name } = req.body;

    const medicineType = await MedicineType.findByPk(id);
    if (!medicineType) {
      return res.status(404).json({ message: "Không tìm thấy loại thuốc" });
    }

    await medicineType.update({
      medicine_type_code: medicine_type_code || medicineType.medicine_type_code,
      medicine_type_name: medicine_type_name || medicineType.medicine_type_name,
    });

    res.status(200).json({ message: "Cập nhật loại thuốc thành công", data: medicineType });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Xóa loại thuốc
const deleteMedicineType = async (req, res) => {
  try {
    const { id } = req.params;

    const medicineType = await MedicineType.findByPk(id);
    if (!medicineType) {
      return res.status(404).json({ message: "Không tìm thấy loại thuốc" });
    }

    await medicineType.destroy();
    res.status(200).json({ message: "Xóa loại thuốc thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// (Tùy chọn) Lấy tất cả loại thuốc
const getAllMedicineTypes = async (req, res) => {
  try {
    const medicineTypes = await MedicineType.findAll();
    res.status(200).json({ data: medicineTypes });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

module.exports = {
  createMedicineType,
  updateMedicineType,
  deleteMedicineType,
  getAllMedicineTypes,
};