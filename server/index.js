require("dotenv").config();

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const passport = require("passport");
const { routes } = require("./routes");
require("./handlers/passport");

const app = express();
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {
      maxAge: 60 * 60 * 1000 // set max age to one hour
    }
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
