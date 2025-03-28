const Diagnosis = require('../models/Diagnosis');
const Patient = require('../models/Patient');

// Tạo phiếu chẩn đoán
exports.createDiagnosis = async (req, res) => {
    try {
      const { patient_id, primary_diagnosis, symptoms, test_results, current_condition, treatment_advice, prescription_id } = req.body;
  
      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: 'Không xác định được bác sĩ từ token' });
      }
      const doctor_id = req.user.id;
  
      if (!patient_id || !primary_diagnosis || !symptoms) {
        return res.status(400).json({ message: 'Thiếu các trường bắt buộc' });
      }
  
      const patient = await Patient.findById(patient_id);
      if (!patient) {
        return res.status(404).json({ message: 'Không tìm thấy bệnh nhân' });
      }
  
      // Kiểm tra và sửa gender nếu không hợp lệ
      if (patient.gender !== "male" && patient.gender !== "female") {
        patient.gender = "male"; // Giá trị mặc định, có thể thay đổi logic
      }
      
      const newDiagnosis = new Diagnosis({
        patient_id,
        doctor_id,
        primary_diagnosis,
        symptoms,
        test_results,
        current_condition,
        treatment_advice,
        prescription_id
      });
  
      await newDiagnosis.save();
  
      patient.medical_history.push(newDiagnosis._id);
      await patient.save();
  
      res.status(201).json({ message: 'Tạo phiếu chẩn đoán thành công', diagnosis: newDiagnosis });
    } catch (error) {
      console.error('Error in createDiagnosis:', error);
      res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
  };

// Lấy danh sách phiếu chẩn đoán
exports.getAllDiagnoses = async (req, res) => {
  try {
    const diagnoses = await Diagnosis.find()
      .populate('patient_id', 'name')
      .populate('doctor_id', 'name')
      .populate('prescription_id', 'medicines notes');
    res.status(200).json(diagnoses);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// Lấy chi tiết phiếu chẩn đoán
exports.getDiagnosisById = async (req, res) => {
  try {
    const diagnosis = await Diagnosis.findById(req.params.id)
      .populate('patient_id', 'name')
      .populate('doctor_id', 'name')
      .populate('prescription_id', 'medicines notes');
    if (!diagnosis) {
      return res.status(404).json({ message: 'Không tìm thấy phiếu chẩn đoán' });
    }
    res.status(200).json(diagnosis);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// Cập nhật phiếu chẩn đoán
exports.updateDiagnosis = async (req, res) => {
  try {
    const { primary_diagnosis, symptoms, test_results, current_condition, treatment_advice, prescription_id } = req.body;

    const diagnosis = await Diagnosis.findById(req.params.id);
    if (!diagnosis) {
      return res.status(404).json({ message: 'Không tìm thấy phiếu chẩn đoán' });
    }

    if (primary_diagnosis) diagnosis.primary_diagnosis = primary_diagnosis;
    if (symptoms) diagnosis.symptoms = symptoms;
    if (test_results !== undefined) diagnosis.test_results = test_results;
    if (current_condition !== undefined) diagnosis.current_condition = current_condition;
    if (treatment_advice !== undefined) diagnosis.treatment_advice = treatment_advice;
    if (prescription_id !== undefined) diagnosis.prescription_id = prescription_id;

    await diagnosis.save();

    res.status(200).json({ message: 'Cập nhật thành công', diagnosis });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// Xóa phiếu chẩn đoán
exports.deleteDiagnosis = async (req, res) => {
  try {
    const diagnosis = await Diagnosis.findById(req.params.id);
    if (!diagnosis) {
      return res.status(404).json({ message: 'Không tìm thấy phiếu chẩn đoán' });
    }

    // Xóa khỏi lịch sử khám bệnh
    const patient = await Patient.findById(diagnosis.patient_id);
    patient.medical_history = patient.medical_history.filter(id => id.toString() !== diagnosis._id.toString());
    await patient.save();

    await Diagnosis.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Xóa thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};