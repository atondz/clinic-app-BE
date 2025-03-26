const Medicine = require("../models/medicine");
const MedicineType = require("../models/medicineType");

// Thêm thuốc
const createMedicine = async (req, res) => {
  try {
    const { medicine_code, medicine_name, medicine_type_id, price, unit, description } = req.body;

    // Danh sách các trường bắt buộc
    const requiredFields = ['medicine_code', 'medicine_name', 'medicine_type_id', 'price', 'unit'];
    let missingFields = [];

    // Kiểm tra từng trường và thêm vào mảng missingFields nếu thiếu
    if (!medicine_code) missingFields.push('medicine_code');
    if (!medicine_name) missingFields.push('medicine_name');
    if (!medicine_type_id) missingFields.push('medicine_type_id');
    if (!price) missingFields.push('price');
    if (!unit) missingFields.push('unit');

    // Nếu có trường bị thiếu, ghi log và trả về lỗi
    if (missingFields.length > 0) {
      console.log("Missing field(s):", missingFields.join(", "));
      return res.status(400).json({
        message: "Vui lòng cung cấp đầy đủ thông tin bắt buộc, ID-Type",
        missingFields: missingFields
      });
    }

    const medicineType = await MedicineType.findById(medicine_type_id);
    if (!medicineType) {
      return res.status(404).json({ message: "Loại thuốc không tồn tại" });
    }

    const newMedicine = new Medicine({
      medicine_code,
      medicine_name,
      medicine_type_id,
      price,
      unit,
      description,
    });

    await newMedicine.save();

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

    const medicine = await Medicine.findById(id);
    if (!medicine) {
      return res.status(404).json({ message: "Không tìm thấy thuốc" });
    }

    if (medicine_type_id) {
      const medicineType = await MedicineType.findById(medicine_type_id);
      if (!medicineType) {
        return res.status(404).json({ message: "Loại thuốc không tồn tại" });
      }
    }

    medicine.medicine_code = medicine_code || medicine.medicine_code;
    medicine.medicine_name = medicine_name || medicine.medicine_name;
    medicine.medicine_type_id = medicine_type_id || medicine.medicine_type_id;
    medicine.price = price || medicine.price;
    medicine.unit = unit || medicine.unit;
    medicine.description = description !== undefined ? description : medicine.description;

    await medicine.save();

    res.status(200).json({ message: "Cập nhật thuốc thành công", data: medicine });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Xóa thuốc
const deleteMedicine = async (req, res) => {
  try {
    const { id } = req.params;

    const medicine = await Medicine.findByIdAndDelete(id);
    if (!medicine) {
      return res.status(404).json({ message: "Không tìm thấy thuốc" });
    }

    res.status(200).json({ message: "Xóa thuốc thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Lấy tất cả thuốc
const getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find().populate("medicine_type_id", "medicine_type_name");
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