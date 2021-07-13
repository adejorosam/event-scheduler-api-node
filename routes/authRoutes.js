const express = require("express");

const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();
const {
  login,
  createUser,
} = authController;

// Auth routes
router.post("/register", createUser);
router.post("login", login);

module.exports = router;