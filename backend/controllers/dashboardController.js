const db = require("../config/db");

exports.getStats = async (req, res) => {
  try {
    const [[students]] = await db.query(`
            SELECT COUNT(*) AS studentCount FROM Student
        `);

    const [[wastage]] = await db.query(`
            SELECT IFNULL(SUM(waste_kg), 0) AS todayWastage FROM Wastage
        `);

    const [[attendance]] = await db.query(`
            SELECT COUNT(*) AS todayAttendance 
            FROM Attendance 
            WHERE status = 'Present'
        `);

    const [[hostels]] = await db.query(`
            SELECT COUNT(*) AS activeHostels FROM Hostel
        `);

    res.json({
      studentCount: students.studentCount,
      todayWastage: wastage.todayWastage,
      todayAttendance: attendance.todayAttendance,
      activeHostels: hostels.activeHostels,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
};
exports.getWastageTrends = async (req, res) => {
  try {
    const [rows] = await db.query(`
            SELECT date, SUM(waste_kg) AS total_wastage
            FROM Wastage
            GROUP BY date
            ORDER BY date
        `);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err.message });
  }
};

exports.getCosts = async (req, res) => {
  try {
    const [rows] = await db.query(`
            SELECT date, total_cost
            FROM Cost
            ORDER BY date
        `);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err.message });
  }
};

exports.getRecentAlerts = async (req, res) => {
  try {
    const [rows] = await db.query(`
            SELECT 
                w.wastage_id,
                m.meal_type,
                w.waste_kg,
                w.reason,
                w.date
            FROM Wastage w
            JOIN Meal m ON w.meal_id = m.meal_id
            ORDER BY w.date DESC
            LIMIT 5
        `);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err.message });
  }
};
