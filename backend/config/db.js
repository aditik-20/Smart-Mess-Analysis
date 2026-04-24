const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "aditimysql@2025",
  database: "mess_analysis",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool
  .getConnection()
  .then((conn) => {
    console.log("✅ Connected to MySQL database!");
    conn.release();
  })
  .catch((err) => {
    console.error("❌ Error connecting to MySQL:", err.message);
  });

module.exports = pool;
