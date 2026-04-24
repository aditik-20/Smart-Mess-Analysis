const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/login", adminController.login);
router.post("/attendance", adminController.addAttendance);
router.post("/wastage", adminController.addWastage);
router.post("/seed-students", adminController.seedStudents);

module.exports = router;
