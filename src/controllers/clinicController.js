const Clinic = require('../models/Clinic');

// Create a new clinic
exports.createClinic = async (req, res) => {
  try {
    const { code, name } = req.body;
    const newClinic = await Clinic.create({ code, name });
    res.status(201).json(newClinic);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all clinics
exports.getAllClinics = async (req, res) => {
  try {
    const clinics = await Clinic.findAll();
    res.status(200).json(clinics);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a clinic by id
exports.getClinicById = async (req, res) => {
  try {
    const clinic = await Clinic.findByPk(req.params.id);
    if (clinic) {
      res.status(200).json(clinic);
    } else {
      res.status(404).json({ error: 'Clinic not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a clinic
exports.updateClinic = async (req, res) => {
  try {
    const { code, name } = req.body;
    const [updated] = await Clinic.update({ code, name }, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedClinic = await Clinic.findByPk(req.params.id);
      res.status(200).json(updatedClinic);
    } else {
      res.status(404).json({ error: 'Clinic not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a clinic
exports.deleteClinic = async (req, res) => {
  try {
    const deleted = await Clinic.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).json({ message: 'Clinic deleted' });
    } else {
      res.status(404).json({ error: 'Clinic not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};