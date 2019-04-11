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
