const express = require("express");
const router = express.Router();
const userController = require("../controllers/Usercontroller");
const { authenticateToken } = require("../middlewares/authMiddleware"); // Đảm bảo import đúng middleware

// Đăng ký
router.post("/register", userController.register);

// Đăng nhập
router.post("/login", userController.login);

// Lấy tất cả người dùng (phải đăng nhập)
router.get("/users", authenticateToken, userController.getAllUsers);

// Lấy người dùng theo tên (phải đăng nhập)
router.get("/users/name/:name", authenticateToken, userController.getUserByName);

// Lấy danh sách bác sĩ
router.get("/doctors", authenticateToken, userController.getDoctors);

// Lấy người dùng theo ID
router.get("/user/:id", authenticateToken, userController.getUserById);

// Lấy thông tin người dùng hiện tại (phải đăng nhập)
router.get('/me', authenticateToken, userController.getMe);

module.exports = router;
