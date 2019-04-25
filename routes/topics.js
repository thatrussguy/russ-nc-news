const topicsRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");
const { getTopics, postTopic } = require("../controllers/topics");

topicsRouter
  .route("/")
  .get(getTopics)
  .post(postTopic)
  .all(methodNotAllowed);

module.exports = topicsRouter;
