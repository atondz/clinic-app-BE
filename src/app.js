// src/app.js
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const patientRoutes = require("./routes/patientRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);     // Định nghĩa API cho users
app.use("/api/patients", patientRoutes);

module.exports = app;
