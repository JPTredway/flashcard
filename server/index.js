require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const { api } = require("./api");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", api);

app.get("/*", (_, res) => {
  res.send("no api route matched, send the react app");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
