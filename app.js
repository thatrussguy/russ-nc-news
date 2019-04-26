const express = require("express");
const apiRouter = require("./routes/api");
const authRouter = require("./routes/auth");
const {
  routeNotFound,
  handle500,
  handleCustomErrors,
  handlePsqlErrors
} = require("./errors");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);
app.use("/login", authRouter);

app.all("/*", routeNotFound);

app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handle500);

module.exports = app;
