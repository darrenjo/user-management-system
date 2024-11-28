const PDFDocument = require("pdfkit");
const { Employee, Unit } = require("../models");

const printEmployees = async (req, res) => {
  try {
    // Ambil data pegawai dari database
    const employees = await Employee.findAll({
      include: [
        { model: Unit, attributes: ["name"] }, // Termasuk unit kerja
      ],
      attributes: ["nip", "name", "birth_place", "birth_date", "phone"], // Kolom yang akan dicetak
    });

    // Jika tidak ada pegawai
    if (!employees.length) {
      return res.status(404).json({ message: "No employees found." });
    }

    // Buat dokumen PDF
    const doc = new PDFDocument();

    // Set response header untuk file PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=employees_list.pdf"
    );

    // Pipe output PDF ke response
    doc.pipe(res);

    // Tambahkan judul pada PDF
    doc.fontSize(16).text("Daftar Pegawai", { align: "center" }).moveDown();

    // Tambahkan kolom header
    doc
      .fontSize(12)
      .text("NIP", 50)
      .text("Nama", 150)
      .text("Tempat Lahir", 250)
      .text("Tanggal Lahir", 350)
      .text("No. Telepon", 450)
      .moveDown();

    // Tambahkan garis pemisah
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

    // Tambahkan data pegawai ke PDF
    employees.forEach((employee) => {
      doc
        .text(employee.nip, 50)
        .text(employee.name, 150)
        .text(employee.birth_place || "-", 250) // Fallback jika tempat lahir kosong
        .text(
          employee.birth_date
            ? employee.birth_date.toISOString().split("T")[0]
            : "-"
        ) // Fallback jika tanggal lahir null
        .text(employee.phone || "-", 450) // Fallback jika nomor telepon kosong
        .moveDown();
    });

    // Selesaikan dokumen
    doc.end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};

module.exports = {
  printEmployees,
};
