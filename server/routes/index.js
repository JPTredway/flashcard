const { Router } = require("express");
const { api } = require("./api");

const router = Router();
router.use("/api", api);

router.get("/*", (_, res) => {
  res.send("no api route matched, send the react app");
});

module.exports = { routes: router };
