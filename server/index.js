import { config } from "dotenv";
config();

import express from "express";

const app = express();

app.get("/*", (_, res) => {
  res.sendFile("calendar-tracker/client/dist/index.html");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
