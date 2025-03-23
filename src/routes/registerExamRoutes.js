// routes/registerExamRoutes.js

const express = require("express");
const router = express.Router();
const registerExamController = require("../controllers/registerExamController");
const isStaff = require("../middlewares/isStaff");

// Tạo đăng ký khám
router.post("/", registerExamController.createRegistration);

// Lấy tất cả đăng ký
router.get("/", registerExamController.getAllRegistrations);

// Tìm theo CCCD
router.get("/by-idcard/:id_card", registerExamController.findByIdCard);

// Tìm theo tên bệnh nhân
router.get("/by-name/:name", registerExamController.findByPatientName);

// Cập nhật đăng ký khám
router.put("/:id", registerExamController.updateRegistration);

// Xoá đăng ký khám
router.delete("/:id", registerExamController.deleteRegistration);

module.exports = router;
