const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "aditimysql@2025",
  database: "mess_analysis",
});

db.connect((err) => {
  if (err) {
    console.error("❌ DB connection failed:", err.message);
    return;
  }
  console.log("✅ MySQL Connected");
});

module.exports = db;
