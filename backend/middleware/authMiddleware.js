const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = {
  verifyToken: async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Simpan data user ke request

      // Pastikan user valid
      const user = await User.findByPk(decoded.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Menambahkan informasi user ke req.user
      req.user.name = user.name;
      req.user.unit = user.unit;

      req.user.isAdmin = user.isAdmin; // Tambahkan informasi admin
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  },

  isAdmin: (req, res, next) => {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  },
};
