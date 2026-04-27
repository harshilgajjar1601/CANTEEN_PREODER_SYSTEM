const express = require("express");
const cors = require("cors");
const path = require("path");
require("./db");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// serve static files
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// test route
app.get("/", (req, res) => {
    res.send("Backend running 🚀");
});



// routes
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/orders");
const adminRoutes = require("./routes/admin");
const menuRoutes = require("./routes/menu");

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/menu", menuRoutes);

// server start
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
