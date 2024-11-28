const { Sequelize } = require("sequelize");
require("dotenv").config(); // Load environment variables from .env file

// Ambil variabel dari .env
const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env;

// Konfigurasi koneksi PostgreSQL menggunakan Sequelize
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres", // Dialect ditentukan secara eksplisit
  dialectOptions: {
    ssl: {
      require: true, // Wajib menggunakan SSL
      rejectUnauthorized: false, // Abaikan validasi sertifikat (opsional)
    },
  },
  logging: false, // Matikan logging SQL jika tidak diperlukan
});

// Test koneksi database
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
