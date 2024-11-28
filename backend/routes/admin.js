const express = require("express");
const { Employee, Unit } = require("../models");
const { printEmployees } = require("../controllers/adminController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");
const { Op } = require("sequelize");

const router = express.Router();

// c. Melihat daftar pegawai
router.get("/employees", verifyToken, isAdmin, async (req, res) => {
  try {
    const employees = await Employee.findAll();
    return res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// d. Mampu melakukan pencarian data pegawai berdasarkan nama atau NIP
router.get("/employees/search", verifyToken, isAdmin, async (req, res) => {
  const { query } = req.query; // Contoh: ?query=John
  try {
    const employees = await Employee.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${query}%` } }, // Pencarian nama (case-insensitive)
          { nip: { [Op.iLike]: `%${query}%` } }, // Pencarian NIP
        ],
      },
    });
    return res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// e. Menampilkan daftar pegawai berdasarkan unit kerja tertentu
router.get(
  "/employees/unit/:unitId",
  verifyToken,
  isAdmin,
  async (req, res) => {
    const { unitId } = req.params;
    try {
      const employees = await Employee.findAll({ where: { unit_id: unitId } });
      return res.status(200).json(employees);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

// f. Tambah data pegawai
router.post("/employees", verifyToken, isAdmin, async (req, res) => {
  const {
    nip,
    name,
    birth_place,
    address,
    birth_date,
    gender_id,
    grade_id,
    echelon_id,
    position_id,
    job_placement_id,
    religion_id,
    unit_id,
    phone,
    npwp,
  } = req.body;

  try {
    // Cek jika NIP sudah ada
    const existingEmployee = await Employee.findOne({ where: { nip } });
    if (existingEmployee) {
      return res.status(400).json({ message: "NIP already exists" });
    }

    const newEmployee = await Employee.create({
      nip,
      name,
      birth_place,
      address,
      birth_date,
      gender_id,
      grade_id,
      echelon_id,
      position_id,
      job_placement_id,
      religion_id,
      unit_id,
      phone,
      npwp,
    });

    return res
      .status(201)
      .json({ message: "Employee added successfully", newEmployee });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// g. Ubah data pegawai
router.put("/employees/:id", verifyToken, isAdmin, async (req, res) => {
  const { id } = req.params;
  const {
    nip,
    name,
    birth_place,
    address,
    birth_date,
    gender_id,
    grade_id,
    echelon_id,
    position_id,
    job_placement_id,
    religion_id,
    unit_id,
    phone,
    npwp,
  } = req.body;

  try {
    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    await employee.update({
      nip,
      name,
      birth_place,
      address,
      birth_date,
      gender_id,
      grade_id,
      echelon_id,
      position_id,
      job_placement_id,
      religion_id,
      unit_id,
      phone,
      npwp,
    });

    return res
      .status(200)
      .json({ message: "Employee updated successfully", employee });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// h. Hapus data pegawai
router.delete("/employees/:id", verifyToken, isAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    await employee.destroy();
    return res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//i. print PDF
router.get("/employees/print", verifyToken, isAdmin, printEmployees);

module.exports = router;
