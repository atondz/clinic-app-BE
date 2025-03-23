// middlewares/isStaff.js

module.exports = function isStaff(req, res, next) {
    if (req.session && req.session.role === 'staff') {
      return next();
    }
    return res.status(403).json({ message: 'Bạn không có quyền truy cập (chỉ dành cho nhân viên)' });
  };
  