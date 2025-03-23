// controllers/profileController.js (MongoDB + Mongoose)

const User = require('../models/user');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const Record = require('../models/Record');
const bcrypt = require('bcryptjs');

exports.renderProfile = async (req, res, next) => {
  try {
    if (!req.session.Username) return res.redirect('/dang-nhap');

    const username = req.session.Username;

    if (!req.session.Doctor) {
      const user = await User.findOne({ Username: username }).lean();
      if (!user) return res.redirect('/dang-nhap');

      user.src = `img/${user.Gender === 'Nữ' ? 'female' : 'male'}.png`;
      user.female = user.Gender === 'Nữ' ? 'checked' : '';
      user.male = user.Gender === 'Nam' ? 'checked' : '';
      user.DOBB = user.DOB?.toISOString().split('T')[0] || '';
      user.DOB = user.DOB?.toLocaleDateString('vi-VN') || '';

      const records = await Record.find({ Username: username }).lean();
      const appointments = await Appointment.find({ Username: username }).lean();
      appointments.forEach(a => {
        a.Date = a.Date?.toLocaleDateString('vi-VN') || '';
      });

      res.render('profile', {
        u: user, uu: user,
        display1: 'd-none', display2: 'd-block',
        editSuccess: 'd-none', editNoSuccess: 'd-none',
        changePasswordSuccess: 'd-none', changePasswordNoSuccess: 'd-none',
        records, appointments, role: 'patient'
      });
    } else {
      const doctor = await Doctor.findOne({ Username: username }).lean();
      if (!doctor) return res.redirect('/dang-nhap');

      const appointments = await Appointment.find({ DoctorID: doctor.ID }).lean();
      appointments.forEach(a => {
        a.Date = a.Date?.toLocaleDateString('vi-VN') || '';
      });

      doctor.href = `https://www.google.com/search?q=${doctor.Title}+${doctor.Name}`;
      if (!doctor.schedule) doctor.error = 'empty';

      res.render('detailDoctor', {
        data: doctor, display1: 'd-none', display2: 'd-block',
        role: 'doctor', appointments, username
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    if (!req.session.Username) return res.redirect('/dang-nhap');

    const username = req.session.Username;
    const userData = await User.findOne({ Username: username });
    if (!userData) return res.redirect('/dang-nhap');

    const form = req.body;
    const isChangingPassword = form.Password && form.NewPassword;
    const isUpdatingProfile = form.Username;

    if (isUpdatingProfile) {
      const existing = await User.findOne({ Username: form.Username });
      const isSelf = form.Username === username;

      if (!existing || isSelf) {
        const updated = await User.findOneAndUpdate(
          { Username: username },
          form,
          { new: true, lean: true }
        );
        req.session.Username = form.Username;

        updated.src = `img/${updated.Gender === 'Nữ' ? 'female' : 'male'}.png`;
        updated.female = updated.Gender === 'Nữ' ? 'checked' : '';
        updated.male = updated.Gender === 'Nam' ? 'checked' : '';
        updated.DOBB = updated.DOB?.toISOString().split('T')[0] || '';
        updated.DOB = updated.DOB?.toLocaleDateString('vi-VN') || '';

        return res.render('profile', {
          u: updated, uu: updated,
          display1: 'd-none', display2: 'd-block',
          editSuccess: 'd-block', editNoSuccess: 'd-none',
          changePasswordSuccess: 'd-none', changePasswordNoSuccess: 'd-none'
        });
      } else {
        const u = userData.toObject();
        u.src = `img/${u.Gender === 'Nữ' ? 'female' : 'male'}.png`;
        u.female = form.Gender === 'Nữ' ? 'checked' : '';
        u.male = form.Gender === 'Nam' ? 'checked' : '';
        form.DOBB = form.DOB || '';
        u.DOB = u.DOB?.toLocaleDateString('vi-VN') || '';

        return res.render('profile', {
          u, uu: form,
          display1: 'd-none', display2: 'd-block',
          editSuccess: 'd-none', editNoSuccess: 'd-block',
          changePasswordSuccess: 'd-none', changePasswordNoSuccess: 'd-none'
        });
      }
    }

    if (isChangingPassword) {
      const isMatch = await bcrypt.compare(form.NewPassword, userData.Password);
      if (!isMatch) {
        const u = userData.toObject();
        u.src = `img/${u.Gender === 'Nữ' ? 'female' : 'male'}.png`;
        u.female = u.Gender === 'Nữ' ? 'checked' : '';
        u.male = u.Gender === 'Nam' ? 'checked' : '';
        u.DOBB = u.DOB?.toISOString().split('T')[0] || '';
        u.DOB = u.DOB?.toLocaleDateString('vi-VN') || '';

        return res.render('profile', {
          u, uu: u, user: form,
          display1: 'd-none', display2: 'd-block',
          editSuccess: 'd-none', editNoSuccess: 'd-none',
          changePasswordSuccess: 'd-none', changePasswordNoSuccess: 'd-block'
        });
      }

      const hashed = await bcrypt.hash(form.Password, 10);
      await User.findOneAndUpdate({ Username: username }, { Password: hashed });

      const u = userData.toObject();
      u.src = `img/${u.Gender === 'Nữ' ? 'female' : 'male'}.png`;
      u.female = u.Gender === 'Nữ' ? 'checked' : '';
      u.male = u.Gender === 'Nam' ? 'checked' : '';
      u.DOBB = u.DOB?.toISOString().split('T')[0] || '';
      u.DOB = u.DOB?.toLocaleDateString('vi-VN') || '';

      return res.render('profile', {
        u, uu: u,
        display1: 'd-none', display2: 'd-block',
        editSuccess: 'd-none', editNoSuccess: 'd-none',
        changePasswordSuccess: 'd-block', changePasswordNoSuccess: 'd-none'
      });
    }
  } catch (err) {
    next(err);
  }
};