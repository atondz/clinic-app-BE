require("dotenv").config();  // Đảm bảo rằng dotenv được gọi trước khi sử dụng các biến môi trường

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5001; // Cung cấp giá trị mặc định nếu PORT không có trong môi trường

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
});
