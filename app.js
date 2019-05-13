const express = require("express");
const cors = require("cors");
const apiRouter = require("./routes/api");
const {
  routeNotFound,
  handle500,
  handleCustomErrors,
  handlePsqlErrors
} = require("./errors");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", apiRouter);

app.all("/*", routeNotFound);

app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handle500);

module.exports = app;
