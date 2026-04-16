const express = require("express");
const router = express.Router();
const adminEmail = "admin@gmail.com";
const adminPassword = "admin123";

// 🔥 ADMIN LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // simple hardcoded admin
  if (email === adminEmail && password === adminPassword) {
    return res.json({
      success: true,
      message: "Admin login successful"
    });
  }

  return res.json({
    success: false,
    message: "Invalid credentials"
  });
});

module.exports = router;