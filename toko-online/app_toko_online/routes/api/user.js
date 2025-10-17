const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user");

// Middleware untuk logging request
router.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl} - ${new Date().toISOString()}`);
  next();
});

router.post("/", userController.createUser);          // POST: Buat user baru
router.get("/", userController.getAllUsers);          // GET: Semua user (Admin)
router.get("/:id", userController.getUserById);       // GET: User berdasarkan ID
router.put("/:id", userController.updateUser);        // PUT: Update user
router.delete("/:id", userController.deleteUser);     // DELETE: Hapus user

module.exports = router;