const uuidv4 = require("uuid/v4");
const bcrypt = require("bcrypt");
const { getUserByEmail, getUserById, addUser } = require("../../db");

module.exports.validateSubmission = (req, res, next) => {
  req.checkBody("email", "You must supply a valid email!").isEmail();
  req.checkBody("password", "You must supply a password!").notEmpty();
  req.sanitizeBody("email").normalizeEmail({
    gmail_remove_subaddress: false
  });

  const errors = req.validationErrors();
  if (errors) {
    res.json(errors);
    return;
  }

  next();
};

module.exports.register = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const id = uuidv4();
    const hash = await bcrypt.hash(password, 10);
    await addUser({ id, email, password: hash });
    next();
  } catch (err) {
    console.log(`Err addding user: ${err}`);
    res.end();
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user) res.json(`could not find user with email ${email}`);

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.json("incorrect password");
      return;
    }

    res.json("logged in");
  } catch (err) {
    console.log(`Err logging in: ${err}`);
    res.end();
  }
};

module.exports.getUser = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.end();
  }
};

module.exports.sendUser = (req, res) => {
  const { user } = req;
  res.json(user);
};
