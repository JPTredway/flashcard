const { Router } = require("express");
const { auth } = require("./auth");
const { lists } = require("./lists");

const router = Router();
router.use(auth);
router.use(lists);

module.exports = { api: router };
