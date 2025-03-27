const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const patientRoutes = require("./routes/patientRoutes");
const medicineTypeRoutes = require("./routes/medicineTypeRoutes");
const medicineRoutes = require("./routes/medicineRoutes");
const clinicRoutes = require('./routes/clinicRoutes');
const registerExamRoutes = require('./routes/registerExamRoutes');
const doctorRoutes = require('./routes/doctorRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/medicineTypes", medicineTypeRoutes);
app.use("/api/medicine", medicineRoutes);
app.use('/api/clinics', clinicRoutes);
app.use('/api/registerExam', registerExamRoutes);
app.use("/api/doctor", doctorRoutes);  // Đảm bảo import đúng route của bác sĩ

module.exports = app;
