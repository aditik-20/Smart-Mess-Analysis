const db = require("../config/db");

function normalizeMeal(meal) {
  if (!meal || meal === "all") return null;
  return meal.charAt(0).toUpperCase() + meal.slice(1).toLowerCase();
}

function getDateCondition(timeFilter, columnName) {
  if (timeFilter === "week") {
    return `YEARWEEK(${columnName}, 1) = YEARWEEK(CURDATE(), 1)`;
  }

  if (timeFilter === "month") {
    return `MONTH(${columnName}) = MONTH(CURDATE()) AND YEAR(${columnName}) = YEAR(CURDATE())`;
  }

  return `DATE(${columnName}) = CURDATE()`;
}

exports.getStats = async (req, res) => {
  const meal = normalizeMeal(req.query.meal);
  const time = req.query.time || "today";
  const hostel = req.query.hostel || "all";

  try {
    let studentQuery = `
      SELECT COUNT(*) AS count
      FROM Student s
      WHERE 1 = 1
    `;

    let studentParams = [];

    if (hostel !== "all") {
      studentQuery += ` AND s.hostel_id = ?`;
      studentParams.push(hostel);
    }

    const [studentCountResult] = await db.query(studentQuery, studentParams);

    let attendanceQuery = `
      SELECT COUNT(*) AS present
      FROM Attendance a
      JOIN Student s ON a.student_id = s.student_id
      WHERE a.status = 'Present'
      AND ${getDateCondition(time, "a.date")}
    `;

    let attendanceParams = [];

    if (hostel !== "all") {
      attendanceQuery += ` AND s.hostel_id = ?`;
      attendanceParams.push(hostel);
    }

    const [attendanceResult] = await db.query(
      attendanceQuery,
      attendanceParams,
    );

    let wastageQuery = `
      SELECT COALESCE(SUM(w.waste_kg), 0) AS total_waste
      FROM Wastage w
      JOIN Meal m ON w.meal_id = m.meal_id
      JOIN Mess me ON m.mess_id = me.mess_id
      WHERE ${getDateCondition(time, "w.date")}
    `;

    let wastageParams = [];

    if (meal) {
      wastageQuery += ` AND m.meal_type = ?`;
      wastageParams.push(meal);
    }

    if (hostel !== "all") {
      wastageQuery += ` AND me.hostel_id = ?`;
      wastageParams.push(hostel);
    }

    const [wastageResult] = await db.query(wastageQuery, wastageParams);

    let hostelQuery = `
      SELECT COUNT(*) AS count
      FROM Hostel
    `;

    const [hostelResult] = await db.query(hostelQuery);

    res.json({
      studentCount: studentCountResult[0]?.count || 0,
      todayAttendance: attendanceResult[0]?.present || 0,
      todayWastage: wastageResult[0]?.total_waste || 0,
      activeHostels: hostelResult[0]?.count || 0,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats",
      error: error.message,
    });
  }
};

exports.getWastageTrends = async (req, res) => {
  const meal = normalizeMeal(req.query.meal);
  const hostel = req.query.hostel || "all";

  try {
    let query = `
      SELECT w.date, COALESCE(SUM(w.waste_kg), 0) AS total_waste
      FROM Wastage w
      JOIN Meal m ON w.meal_id = m.meal_id
      JOIN Mess me ON m.mess_id = me.mess_id
      WHERE w.date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
    `;

    let params = [];

    if (meal) {
      query += ` AND m.meal_type = ?`;
      params.push(meal);
    }

    if (hostel !== "all") {
      query += ` AND me.hostel_id = ?`;
      params.push(hostel);
    }

    query += `
      GROUP BY w.date
      ORDER BY w.date ASC
    `;

    const [rows] = await db.query(query, params);

    res.json(rows);
  } catch (error) {
    console.error("Wastage trends error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch wastage trends",
      error: error.message,
    });
  }
};

exports.getCosts = async (req, res) => {
  const time = req.query.time || "today";

  try {
    const [rows] = await db.query(`
      SELECT date, total_cost
      FROM Cost
      WHERE ${getDateCondition(time, "date")}
      ORDER BY date ASC
    `);

    res.json(rows);
  } catch (error) {
    console.error("Cost analysis error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch cost analysis",
      error: error.message,
    });
  }
};

exports.getRecentAlerts = async (req, res) => {
  try {
    const [wastageRows] = await db.query(`
      SELECT COALESCE(SUM(waste_kg), 0) AS total
      FROM Wastage
      WHERE date = CURDATE()
    `);

    const [attendanceRows] = await db.query(`
      SELECT COUNT(*) AS present
      FROM Attendance
      WHERE date = CURDATE()
      AND status = 'Present'
    `);

    const alerts = [];

    const todayWastage = Number(wastageRows[0]?.total || 0);
    const todayAttendance = Number(attendanceRows[0]?.present || 0);

    if (todayWastage > 10) {
      alerts.push({
        id: 1,
        type: "warning",
        message: "⚠️ High food wastage detected today.",
        time: "Just now",
      });
    }

    if (todayAttendance < 5) {
      alerts.push({
        id: 2,
        type: "info",
        message: "📉 Low attendance recorded today.",
        time: "Just now",
      });
    }

    if (alerts.length === 0) {
      alerts.push({
        id: 3,
        type: "success",
        message: "✅ Mess operations look normal today.",
        time: "Just now",
      });
    }

    res.json(alerts);
  } catch (error) {
    console.error("Alerts error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch alerts",
      error: error.message,
    });
  }
};
