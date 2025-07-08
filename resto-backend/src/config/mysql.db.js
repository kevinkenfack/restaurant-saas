const { CONFIG } = require("./index");
const mysql = require("mysql2/promise");
const url = require("url");

// Parse l'URL pour extraire host, user, password, database
const dbUrl = new URL(CONFIG.DATABASE_URL);

const pool = mysql.createPool({
  host: dbUrl.hostname,
  port: dbUrl.port,
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.replace(/^\//, ""), // enlever le slash
  ssl: {
    rejectUnauthorized: false, // ou true si tu as le certificat
  },
  multipleStatements: true,
  dateStrings: false,
  waitForConnections: true,
  connectionLimit: 99,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
});

console.log(`DB Pool Created.`);

exports.getMySqlPromiseConnection = async () => {
  try {
    return await pool.getConnection();
  } catch (error) {
    console.error("Pool Connection Error: =======>");
    console.error(error);
    throw error;
  }
};
