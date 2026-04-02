const express = require("express");
const cors = require("cors");
require("./db");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
    res.send("Backend running 🚀");
});

// routes (aagad use thase)
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// server start
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
