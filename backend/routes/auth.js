const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");


router.get("/menu", authMiddleware, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

// register route
router.post("/register", authController.registerUser);

// login route
router.post("/login", authController.loginUser);

module.exports = router;