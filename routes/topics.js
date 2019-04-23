const topicsRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");
const { getTopics } = require("../controllers/topics");

topicsRouter
  .route("/")
  .get(getTopics)
  .all(methodNotAllowed);

module.exports = topicsRouter;
