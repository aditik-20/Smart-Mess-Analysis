const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "mess_analysis",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool
  .getConnection()
  .then((conn) => {
    console.log("Connected to MySQL database!");
    conn.release();
  })
  .catch((err) => {
    if (err.code === "ER_ACCESS_DENIED_ERROR") {
      console.error(
        "Database connection failed: Access Denied. (Check your DB_PASSWORD in .env). Proceeding with mock data.",
      );
    } else {
      console.error("Error connecting to MySQL:", err.message);
    }
  });

module.exports = pool;
