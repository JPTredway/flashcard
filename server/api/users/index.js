const { Router } = require("express");
const uuidv4 = require("uuid/v4");
const bcrypt = require("bcrypt");
const { getUserById, addUser } = require("../../../db");

const router = Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const id = uuidv4();
    const hash = await bcrypt.hash(password, 10);
    const user = await addUser({ id, email, password: hash });
    res.json(user);
  } catch (err) {
    console.log(`Err addding user: ${err}`);
    res.end();
  }

  console.log(`${req.method} request at route "${req.originalUrl}"`);
});

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const user = await getUserById(req.params.id);
      res.json(user);
    } catch (err) {
      console.log(err);
      res.end();
    }

    console.log(`${req.method} request at route "${req.originalUrl}"`);
  })
  .put(async (req, res) => {
    console.log(`${req.method} request at route "${req.originalUrl}"`);
    res.end();
  })
  .delete(async (req, res) => {
    console.log(`${req.method} request at route "${req.originalUrl}"`);
    res.end();
  });

module.exports = { users: router };
