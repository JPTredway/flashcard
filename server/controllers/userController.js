const uuidv4 = require("uuid/v4");
const bcrypt = require("bcrypt");
const {
  getUserByEmail,
  getUserById,
  addUser,
  updateUser
} = require("../../db");

module.exports.validateLogin = (req, res, next) => {
  req.checkBody("email", "You must supply a valid email!").isEmail();
  req.checkBody("password", "You must supply a password!").notEmpty();
  req.sanitizeBody("email").normalizeEmail({
    gmail_remove_subaddress: false
  });

  const errors = req.validationErrors();
  if (errors) {
    return res.json(errors);
  }

  next();
};

module.exports.register = async (req, res, next) => {
  const { email, password } = req.body;
  const id = uuidv4();
  const hash = await bcrypt.hash(password, 10);
  await addUser({ id, email, password: hash });

  next();
};

module.exports.sendUser = (req, res) => {
  res.json(req.user);
};

// module.exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await getUserByEmail(email);
//   if (!user) res.json(`could not find user with email ${email}`);

//   const isValid = await bcrypt.compare(password, user.password);
//   if (!isValid) {
//     return res.json("incorrect password");
//   }

//   res.json("logged in");
// };
