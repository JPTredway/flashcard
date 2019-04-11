const { Router } = require("express");
const { users } = require("./users");
const { auth } = require("./auth");

const router = Router();
router.use(users);
router.use(auth);

module.exports = { api: router };
