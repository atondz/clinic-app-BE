const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a new user
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Check if all required fields are provided
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
   
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if the email is already registered in the system
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    // Validate the role against a predefined list of allowed roles
    const validRoles = ["admin", "doctor", "staff"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Hash the password before storing it in the database for security purposes
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user record in the database
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Return the newly created user’s information (excluding password)
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
      },
    });
  } catch (error) {
    // Handle unexpected server errors and return an error response
    res.status(500).json({
      message: "Error creating user",
      error: error.message || error,
    });
  }
};

// Authenticate and log in a user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user in the database based on the provided email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate a JWT token containing the user's ID and role with a 1-hour expiration
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return the generated authentication token
    res.json({ token });
  } catch (error) {
    // Handle unexpected server errors during login
    res.status(500).json({ message: "Error logging in", error });
  }
};
