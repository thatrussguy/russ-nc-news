const topicsRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");

topicsRouter
  .route("/")
  .get((req, res) => res.send({ ok: true }))
  .all(methodNotAllowed);

module.exports = apiRouter;
