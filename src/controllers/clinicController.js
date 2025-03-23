const Clinic = require('../models/Clinic');

exports.createClinic = async (req, res) => {
  try {
    const { code, name } = req.body;
    const newClinic = new Clinic({ code, name });
    await newClinic.save();
    res.status(201).json(newClinic);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllClinics = async (req, res) => {
  try {
    const clinics = await Clinic.find();
    res.status(200).json(clinics);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getClinicById = async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.params.id);
    if (clinic) {
      res.status(200).json(clinic);
    } else {
      res.status(404).json({ error: 'Clinic not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateClinic = async (req, res) => {
  try {
    const { code, name } = req.body;
    const clinic = await Clinic.findByIdAndUpdate(req.params.id, { code, name }, { new: true });
    if (clinic) {
      res.status(200).json(clinic);
    } else {
      res.status(404).json({ error: 'Clinic not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteClinic = async (req, res) => {
  try {
    const deletedClinic = await Clinic.findByIdAndDelete(req.params.id);
    if (deletedClinic) {
      res.status(204).json({ message: 'Clinic deleted' });
    } else {
      res.status(404).json({ error: 'Clinic not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
