const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Employee, User } = require("../models");
require("dotenv").config();

const router = express.Router();

// Register Pegawai
router.post("/register", async (req, res) => {
  const { nip, name, email, password, profile_pic, isAdmin } = req.body;

  try {
    // Check if email or NIP already exists
    const existingEmail = await User.findOne({ where: { email } });
    const existingNIP = await Employee.findOne({ where: { nip } });

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    if (existingNIP) {
      return res.status(400).json({ message: "NIP already exists" });
    }

    // Create Employee record
    const employee = await Employee.create({ nip, name });

    // Create User record
    const user = await User.create({
      employee_id: employee.id,
      email,
      password,
      profile_pic,
      isAdmin: isAdmin || false, // Default to false if not provided
    });

    return res.status(201).json({ message: "Registration successful", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Login Pegawai
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, employeeId: user.employee_id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
