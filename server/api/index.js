const { Router } = require("express");
const { users } = require("./users");
const { login } = require("./login");
const { get } = require("https");

const router = Router();

router.use("/users", users);
router.use("/login", login);

router.all("/", (req, res) => {
  res.send("try a more specific route");
});

module.exports = { api: router };
