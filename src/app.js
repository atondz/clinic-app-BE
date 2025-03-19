// src/app.js
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const patientRoutes = require("./routes/patientRoutes");
const medicineTypeRoutes = require("./routes/medicineTypeRoutes");
const medicineRoutes = require("./routes/medicineRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);     // Định nghĩa API cho users
app.use("/api/patients", patientRoutes);
app.use("/api/medicineTypes", medicineTypeRoutes);
app.use("/api/medicine", medicineRoutes);
module.exports = app;
