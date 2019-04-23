const articlesRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");
const { getArticles } = require("../controllers/articles");

articlesRouter
  .route("/")
  .get(getArticles)
  .all(methodNotAllowed);

module.exports = articlesRouter;
