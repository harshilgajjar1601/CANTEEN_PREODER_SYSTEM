const express = require("express");
const router = express.Router();
const db = require("../db");


// 🔥 GET orders by email
router.get("/", (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.json({ success: false, message: "Email required" });
  }

  const query = "SELECT * FROM orders WHERE email = ?";

  db.query(query, [email], (err, result) => {
    if (err) {
      console.log("GET ERROR 🔴:", err);
      return res.json({ success: false, message: "Database error" });
    }

    console.log("ORDERS FETCHED ✅:", result);
    res.json(result);
  });
});


// 🔥 POST - save order
router.post("/", (req, res) => {
  const { order_id, items, amount, status, email } = req.body;

  // Debug
  console.log("ORDER DATA 🔥:", req.body);

  if (!order_id || !items || !amount || !status || !email) {
    return res.json({
      success: false,
      message: "All fields required"
    });
  }

  const query = `
    INSERT INTO orders (order_id, email, items, amount, status)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [order_id, email, items, amount, status], (err, result) => {
    if (err) {
      console.log("INSERT ERROR 🔴:", err);
      return res.json({ success: false, message: "Insert failed" });
    }

    console.log("ORDER SAVED ✅");
    res.json({
      success: true,
      message: "Order placed successfully"
    });
  });
});

module.exports = router;