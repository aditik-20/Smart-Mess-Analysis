
const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

// 🔹 Dashboard Stats (main summary)
router.get("/stats", dashboardController.getStats);

// 🔹 Food wastage trends (for charts)
router.get("/wastage-trends", dashboardController.getWastageTrends);

// 🔹 Cost analysis
router.get("/costs", dashboardController.getCosts);

// 🔹 Alerts (gas, smoke, etc.)
router.get("/recent-alerts", dashboardController.getRecentAlerts);

// 🔹 Optional test route (VERY USEFUL for debugging)
router.get("/test", (req, res) => {
  res.json({ message: "Dashboard API working ✅" });
});

const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/stats', dashboardController.getStats);
router.get('/wastage-trends', dashboardController.getWastageTrends);
router.get('/costs', dashboardController.getCosts);
router.get('/recent-alerts', dashboardController.getRecentAlerts);


module.exports = router;
