const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "doctor", "staff"],
    required: true,
  },
},
{
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});

module.exports = mongoose.model("User", userSchema);
