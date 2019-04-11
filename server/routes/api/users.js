const { Router } = require("express");
const { getUser } = require("../../controllers/userController");
const router = Router();

router
  .route("/users/:id")
  .get(getUser)
  .put(async (req, res) => {
    console.log(`${req.method} request at route "${req.originalUrl}"`);
    res.end();
  })
  .delete(async (req, res) => {
    console.log(`${req.method} request at route "${req.originalUrl}"`);
    res.end();
  });

module.exports = { users: router };
