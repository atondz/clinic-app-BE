const express = require('express');
const router = express.Router();
const diagnosisController = require('../controllers/diagnosisController');
const { authenticateToken, doctorOnly } = require('../middlewares/authMiddleware');

// Áp dụng xác thực cho tất cả route
router.use(authenticateToken);

// Chỉ bác sĩ mới tạo, cập nhật, xóa phiếu chẩn đoán
router.post('/', doctorOnly, diagnosisController.createDiagnosis);
router.put('/:id', doctorOnly, diagnosisController.updateDiagnosis);
router.delete('/:id', doctorOnly, diagnosisController.deleteDiagnosis);

// Tất cả người dùng đăng nhập đều có thể xem
router.get('/', diagnosisController.getAllDiagnoses);
router.get('/:id', diagnosisController.getDiagnosisById);

module.exports = router;