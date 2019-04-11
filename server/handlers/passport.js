const passport = require("passport");
const { Strategy } = require("passport-local");
const { getUserByEmail } = require("../../db");

passport.use(
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, _, done) => {
      const user = await getUserByEmail(email);
      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
