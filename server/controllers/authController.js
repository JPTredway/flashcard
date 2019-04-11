const passport = require("passport");

module.exports.login = passport.authenticate("local");
module.exports.logout = (req, res) => {
  req.logout();
  res.json("Successfully logged out");
};

module.exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.json("User not logged in");
};

module.exports.isListOwner = (req, res, next) => {
  if (req.user.id === req.list.user_id) {
    return next();
  }

  res.json("You do not have permission to update this resource");
};

module.exports.isUser = (req, res, next) => {
  if (req.user.id === req.params.id) {
    return next();
  }

  res.json("You do not have permission to update this resource");
};
