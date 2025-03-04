const express = require("express");
const {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
  getPatientByIdCard,
} = require("../controllers/PatientsController.js");

const router = express.Router();

router.post("/", createPatient);
router.get("/", getAllPatients);
router.get("/:id", getPatientById);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);
router.get("/id_card/:id_card", getPatientByIdCard);

module.exports = router;
