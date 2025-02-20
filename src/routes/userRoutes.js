// src/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/Usercontroller");

router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
