const express = require("express");
const router = express.Router();
const medicineTypeController = require("../controllers/medicineTypeController");

// Endpoint: Thêm loại thuốc
router.post("/", medicineTypeController.createMedicineType);

// Endpoint: Sửa loại thuốc
router.put("/:id", medicineTypeController.updateMedicineType);

// Endpoint: Xóa loại thuốc
router.delete("/:id", medicineTypeController.deleteMedicineType);

// (Tùy chọn) Endpoint: Lấy tất cả loại thuốc
router.get("/", medicineTypeController.getAllMedicineTypes);

module.exports = router;