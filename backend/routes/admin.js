const express = require("express");
const router = express.Router();
const db = require("../db");
const adminEmail = "admin@gmail.com";
const adminPassword = "admin123";
const VALID_STATUSES = ["Pending", "Preparing", "Ready", "Picked Up"];

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

const normalizeOrder = (order) => ({
  ...order,
  status: VALID_STATUSES.includes(order.status) ? order.status : "Pending"
});

router.get("/orders", (req, res) => {
  const query = `
    SELECT o.*, u.name AS customer_name
    FROM orders o
    LEFT JOIN users u ON u.email = o.email
    ORDER BY o.id DESC
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.log("ADMIN ORDERS ERROR 🔴:", err);
      return res.json({ success: false, message: "Database error" });
    }

    res.json(result.map(normalizeOrder));
  });
});

router.put("/orders/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!VALID_STATUSES.includes(status)) {
    return res.json({
      success: false,
      message: "Invalid status"
    });
  }

  const query = "UPDATE orders SET status = ? WHERE id = ?";

  db.query(query, [status, id], (err, result) => {
    if (err) {
      console.log("STATUS UPDATE ERROR 🔴:", err);
      return res.json({ success: false, message: "Update failed" });
    }

    if (!result.affectedRows) {
      return res.json({ success: false, message: "Order not found" });
    }

    res.json({
      success: true,
      message: "Order status updated",
      status
    });
  });
});

module.exports = router;
