const mysql = require("mysql2/promise");
const { CONFIG } = require("./index");

const pool = mysql.createPool({
  uri: CONFIG.DATABASE_URL,   // ton URL standard
  ssl: {
    rejectUnauthorized: false // permet de bypasser le SSL si le certificat n'est pas reconnu
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
