const express = require("express");
const rateLimit = require("./rate-limit.cjs");

const app = express();

const requestLimit = 2;
const requestLimitWindow = 5000;
const requestTimeout = 15000;

const limiter = rateLimit(requestLimit, requestLimitWindow, requestTimeout);
app.use(limiter);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});