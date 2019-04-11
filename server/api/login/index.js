const { Router } = require("express");
const bcrypt = require("bcrypt");
const { getUserByEmail } = require("../../../db");

const router = Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user) res.json(`could not find user with email ${email}`);

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.json("incorrect password");
    }

    res.json("logged in");
  } catch (err) {
    console.log(`Err logging in: ${err}`);
    res.end();
  }

  console.log(`${req.method} request at route "${req.originalUrl}"`);
});

module.exports = { login: router };
