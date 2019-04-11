const passport = require("passport");
const { Strategy } = require("passport-local");
const { getUserByEmail } = require("../../db");

passport.use(
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {
      const user = await getUserByEmail(email);
      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  done(null, user.id);
});
