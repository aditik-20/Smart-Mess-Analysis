
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const dashboardRoutes = require("./routes/dashboardRoutes");
const adminRoutes = require("./routes/adminRoutes");
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const dashboardRoutes = require('./routes/dashboardRoutes');
const adminRoutes = require('./routes/adminRoutes');


const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend")));

// Add a default route to verify the server is running
app.get("/", (req, res) => {
  res.json({ message: "Smart Mess Analytics API is running!" });
});

// Routes
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use(express.static(path.join(__dirname, '../frontend')));

// Add a default route to verify the server is running
app.get('/', (req, res) => {
    res.json({ message: 'Smart Mess Analytics API is running!' });
});

// Routes
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

