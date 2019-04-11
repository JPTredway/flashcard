const { Router } = require("express");
const {
  validateLogin,
  register,
  sendUser
} = require("../../controllers/userController");
const { login, logout } = require("../../controllers/authController");

const router = Router();

router.post("/login", validateLogin, login, sendUser);
router.get("/logout", logout);
router.post("/register", validateLogin, register, login, sendUser);

module.exports = { auth: router };
