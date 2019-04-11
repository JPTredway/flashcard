const { Router } = require("express");
const {
  validateSubmission,
  register,
  sendUser
} = require("../../controllers/userController");
const { login, logout } = require("../../controllers/authController");

const router = Router();

router.post("/login", validateSubmission, login, sendUser);
router.get("/logout", logout);
router.post("/register", validateSubmission, register, login, sendUser);

module.exports = { auth: router };
