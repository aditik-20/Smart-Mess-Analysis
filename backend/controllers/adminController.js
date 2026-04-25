const pool = require("../config/db");

exports.login = (req, res) => {
  const { username, password } = req.body;

  if (username === "Admin123" && password === "DbmsProject") {
    res.json({ success: true, message: "Login successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
};

exports.addAttendance = async (req, res) => {
  let { registration_number, date, status } = req.body;

  registration_number = registration_number.trim().toUpperCase();

  try {
    const [studentRows] = await pool.query(
      "SELECT student_id FROM Student WHERE UPPER(registration_number) = ?",
      [registration_number],
    );

    if (studentRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student with this ID not found",
      });
    }

    const student_id = studentRows[0].student_id;

    await pool.query(
      "INSERT INTO Attendance (student_id, date, status) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE status = VALUES(status)",
      [student_id, date, status],
    );

    res.json({ success: true, message: "Attendance recorded successfully" });
  } catch (error) {
    console.error("Error recording attendance:", error);

    res.status(500).json({
      success: false,
      message: error.message,
      code: error.code,
    });
  }
};

exports.addWastage = async (req, res) => {
  const { meal_type, waste_kg, reason, date } = req.body;

  try {
    const [mealRows] = await pool.query(
      "SELECT meal_id FROM Meal WHERE meal_type = ? AND date = ?",
      [meal_type, date],
    );

    let meal_id;

    if (mealRows.length > 0) {
      meal_id = mealRows[0].meal_id;
    } else {
      const [insertMeal] = await pool.query(
        "INSERT INTO Meal (meal_type, date, serving_time, mess_id) VALUES (?, ?, ?, ?)",
        [meal_type, date, "12:00:00", 1],
      );

      meal_id = insertMeal.insertId;
    }

    await pool.query(
      "INSERT INTO Wastage (meal_id, waste_kg, reason, date) VALUES (?, ?, ?, ?)",
      [meal_id, waste_kg, reason, date],
    );

    res.json({ success: true, message: "Wastage recorded successfully" });
  } catch (error) {
    console.error("Error recording wastage:", error);

    res.status(500).json({
      success: false,
      message: error.message,
      code: error.code,
    });
  }
};

exports.seedStudents = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT COUNT(*) as count FROM Student");

    if (rows[0].count > 0) {
      return res.status(400).json({
        success: false,
        message: "Database already contains students. Seeding aborted.",
      });
    }

    let queries = [];

    for (let i = 0; i < 50; i++) {
      const regNo = `RA2411003010${i.toString().padStart(2, "0")}`;
      const phone = `9999900${i.toString().padStart(2, "0")}`;

      queries.push(
        pool.query(
          `INSERT INTO Student 
          (registration_number, first_name, last_name, dob, age, phone, email, hostel_id) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            regNo,
            "Student",
            `${i}`,
            "2004-01-01",
            20,
            phone,
            `student${i}@example.com`,
            1,
          ],
        ),
      );
    }

    await Promise.all(queries);

    res.json({ success: true, message: "Successfully seeded 50 students." });
  } catch (error) {
    console.error("Error seeding students:", error);

    res.status(500).json({
      success: false,
      message: error.message,
      code: error.code,
    });
  }
};
