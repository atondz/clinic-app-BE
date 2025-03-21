const express = require('express');
const clinicController = require('../controllers/clinicController');

const router = express.Router();

router.post('/', clinicController.createClinic);
router.get('/', clinicController.getAllClinics);
router.get('/:id', clinicController.getClinicById);
router.put('/:id', clinicController.updateClinic);
router.delete('/:id', clinicController.deleteClinic);

module.exports = router;