const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

router.get("/stats", dashboardController.getStats);
router.get("/wastage-trends", dashboardController.getWastageTrends);
router.get("/costs", dashboardController.getCosts);
router.get("/recent-alerts", dashboardController.getRecentAlerts);

module.exports = router;
