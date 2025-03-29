const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/prescriptionController');

router.post('/', registrationController.createPrescription);
router.get('/', registrationController.getAllPrescriptions);
router.get('/:id', registrationController.getPrescriptionById);
router.put('/:id', registrationController.updatePrescription);
router.delete('/:id', registrationController.deletePrescription);
router.get("/charged/:id", registrationController.charged);
router.get("/cancel/:id", registrationController.cancel);
module.exports = router;
