// src/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/Usercontroller");
const { verifyToken } = require("../middlewares/authMiddleware");

router.post("/register", userController.register);
router.post("/login", userController.login);
// Lấy tất cả người dùng (phải đăng nhập)
router.get("/users", verifyToken, userController.getAllUsers);

// Lấy người dùng theo tên (phải đăng nhập)
router.get("/users/name/:name", verifyToken, userController.getUserByName);

module.exports = router;
