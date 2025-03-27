const jwt = require('jsonwebtoken');

module.exports = {
  // Middleware kiểm tra token và xác thực
  authenticateToken: (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) return res.status(401).json({ msg: 'Unauthorized' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Lưu thông tin user vào request để sử dụng ở endpoint sau
      next();
    } catch (error) {
      res.status(401).json({ msg: 'Token is invalid' });
    }
  },

  // Middleware kiểm tra vai trò là bác sĩ
  doctorOnly: (req, res, next) => {
    if (req.user.role !== 'doctor') {
      return res.status(403).json({ message: 'Access forbidden: requires doctor role' });
    }
    next();
  }
};
