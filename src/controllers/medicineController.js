const Medicine = require("../models/medicine");
const MedicineType = require("../models/medicineType");

// Thêm thuốc
const createMedicine = async (req, res) => {
  try {
    const { medicine_code, medicine_name, medicine_type_id, price, unit, description } = req.body;

    if (!medicine_code || !medicine_name || !medicine_type_id || !price || !unit) {
      return res.status(400).json({ message: "Vui lòng cung cấp đầy đủ thông tin bắt buộc" });
    }

    // Kiểm tra xem medicine_type_id có tồn tại không
    const medicineType = await MedicineType.findByPk(medicine_type_id);
    if (!medicineType) {
      return res.status(404).json({ message: "Loại thuốc không tồn tại" });
    }

    const newMedicine = await Medicine.create({
      medicine_code,
      medicine_name,
      medicine_type_id,
      price,
      unit,
      description,
    });

    res.status(201).json({ message: "Thêm thuốc thành công", data: newMedicine });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Sửa thuốc
const updateMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const { medicine_code, medicine_name, medicine_type_id, price, unit, description } = req.body;

    const medicine = await Medicine.findByPk(id);
    if (!medicine) {
      return res.status(404).json({ message: "Không tìm thấy thuốc" });
    }

    // Kiểm tra medicine_type_id nếu có cập nhật
    if (medicine_type_id) {
      const medicineType = await MedicineType.findByPk(medicine_type_id);
      if (!medicineType) {
        return res.status(404).json({ message: "Loại thuốc không tồn tại" });
      }
    }

    await medicine.update({
      medicine_code: medicine_code || medicine.medicine_code,
      medicine_name: medicine_name || medicine.medicine_name,
      medicine_type_id: medicine_type_id || medicine.medicine_type_id,
      price: price || medicine.price,
      unit: unit || medicine.unit,
      description: description !== undefined ? description : medicine.description,
    });

    res.status(200).json({ message: "Cập nhật thuốc thành công", data: medicine });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Xóa thuốc
const deleteMedicine = async (req, res) => {
  try {
    const { id } = req.params;

    const medicine = await Medicine.findByPk(id);
    if (!medicine) {
      return res.status(404).json({ message: "Không tìm thấy thuốc" });
    }

    await medicine.destroy();
    res.status(200).json({ message: "Xóa thuốc thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Lấy tất cả thuốc
const getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.findAll({
      include: [{ model: MedicineType, attributes: ["medicine_type_name"] }], // Lấy thêm tên loại thuốc
    });
    res.status(200).json({ data: medicines });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

module.exports = {
  createMedicine,
  updateMedicine,
  deleteMedicine,
  getAllMedicines,
};