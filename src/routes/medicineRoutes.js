const express = require("express");
const router = express.Router();
const medicineController = require("../controllers/medicineController");

// Endpoint: Thêm thuốc
router.post("/", medicineController.createMedicine);

// Endpoint: Sửa thuốc
router.put("/:id", medicineController.updateMedicine);

// Endpoint: Xóa thuốc
router.delete("/:id", medicineController.deleteMedicine);

// Endpoint: Lấy tất cả thuốc
router.get("/", medicineController.getAllMedicines);

module.exports = router;
