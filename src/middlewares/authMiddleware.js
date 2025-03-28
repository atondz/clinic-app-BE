const jwt = require('jsonwebtoken');

module.exports = {
  // Middleware kiểm tra token và xác thực
  authenticateToken: (req, res, next) => {
    const authHeader = req.header('Authorization');
    console.log('Authorization Header:', authHeader);
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ msg: 'Unauthorized - No Bearer token provided' });
    }
  
    const token = authHeader.replace('Bearer ', '');
    console.log('Token:', token);
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded Token:', decoded);
      req.user = decoded; // Gán decoded trực tiếp
      if (!req.user.id) { // Sửa từ _id thành id
        return res.status(401).json({ msg: 'Token does not contain user ID' });
      }
      next();
    } catch (error) {
      console.error('JWT Verify Error:', error.message);
      return res.status(401).json({ msg: 'Token is invalid' });
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
