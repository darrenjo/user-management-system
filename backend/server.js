const express = require("express");
const { sequelize } = require("./models");
// const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());
// app.use(bodyParser.json());

// Konfigurasi CORS
app.use(
  cors({
    origin: "http://localhost:5000", // URL frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Metode HTTP yang diizinkan
    credentials: true, // Jika perlu mengirimkan cookies/auth headers
  })
);

const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// Sinkronisasi dengan database
(async () => {
  try {
    await sequelize.sync({ alter: false }); // Gunakan `alter: true` untuk memperbarui tabel otomatis
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing the database:", error);
  }
})();

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
