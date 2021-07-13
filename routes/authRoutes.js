const express = require("express");

const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
const {
  login,
  createUser,
//   logout
} = authController;

// Auth routes
router.post("/register", createUser);
router.post("/login", login);
// Backlogs
// router.post("/logout", logout);

module.exports = router;