const express = require('express');
const router = express.Router();
const { authenticateToken, doctorOnly } = require('../middlewares/authMiddleware'); // Import middleware
const doctorController = require('../controllers/doctorController');

// Lấy tất cả phiếu khám của bác sĩ
router.get('/registrations', authenticateToken, doctorOnly, doctorController.getDoctorRegistrations);

// Tạo đơn thuốc cho bệnh nhân
router.post('/prescriptions', authenticateToken, doctorOnly, doctorController.createPrescription);

// Lấy danh sách phiếu khám của bác sĩ dựa trên doctor_id
router.get('/registrations/:doctor_id', authenticateToken, doctorOnly, doctorController.getRegistrationsByDoctor);


module.exports = router;
