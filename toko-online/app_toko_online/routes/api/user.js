const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user");

// Endpoint CRUD User
router.post("/", userController.createUser);      // Create User
router.get("/", userController.getAllUsers);      // Get All Users
router.get("/:id", userController.getUserById);   // Get User by ID
router.put("/:id", userController.updateUser);    // Update User
router.delete("/:id", userController.deleteUser); // Delete User

module.exports = router;
