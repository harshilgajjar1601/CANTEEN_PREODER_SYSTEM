const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/menu/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error("Only image files are allowed!"));
  },
  limits: { fileSize: 5 * 1024 * 1024 }
});

router.get("/", (req, res) => {
  const query = "SELECT * FROM menu_items WHERE is_available = 1 ORDER BY category, name";
  
  db.query(query, (err, result) => {
    if (err) {
      console.log("GET MENU ERROR:", err);
      return res.json({ success: false, message: "Database error" });
    }
    res.json({ success: true, items: result });
  });
});

router.post("/", (req, res) => {
  const { name, category, price, tag, image_url } = req.body;
  
  if (!name || !category || !price) {
    return res.json({ success: false, message: "Name, category, and price are required" });
  }
  
  const query = `
    INSERT INTO menu_items (name, category, price, image_url, tag)
    VALUES (?, ?, ?, ?, ?)
  `;
  
  db.query(query, [name, category, price, image_url || null, tag || null], (err, result) => {
    if (err) {
      console.log("INSERT MENU ERROR:", err);
      return res.json({ success: false, message: "Insert failed" });
    }
    res.json({ success: true, message: "Menu item added", id: result.insertId });
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, category, price, tag, image_url, is_available } = req.body;
  
  const query = `
    UPDATE menu_items 
    SET name = ?, category = ?, price = ?, tag = ?, image_url = ?, is_available = ?
    WHERE id = ?
  `;
  
  db.query(query, [name, category, price, tag || null, image_url || null, is_available !== undefined ? is_available : 1, id], (err, result) => {
    if (err) {
      console.log("UPDATE MENU ERROR:", err);
      return res.json({ success: false, message: "Update failed" });
    }
    res.json({ success: true, message: "Menu item updated" });
  });
});

router.put("/:id/image", upload.single("image"), (req, res) => {
  const { id } = req.params;
  
  if (!req.file) {
    return res.json({ success: false, message: "No image provided" });
  }
  
  const image_url = `/uploads/menu/${req.file.filename}`;
  
  const query = "UPDATE menu_items SET image_url = ? WHERE id = ?";
  
  db.query(query, [image_url, id], (err, result) => {
    if (err) {
      console.log("UPDATE IMAGE ERROR:", err);
      return res.json({ success: false, message: "Update failed" });
    }
    res.json({ success: true, message: "Image updated", image_url });
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  
  const query = "DELETE FROM menu_items WHERE id = ?";
  
  db.query(query, [id], (err, result) => {
    if (err) {
      console.log("DELETE MENU ERROR:", err);
      return res.json({ success: false, message: "Delete failed" });
    }
    res.json({ success: true, message: "Menu item deleted" });
  });
});

module.exports = router;
