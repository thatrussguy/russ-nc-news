const articlesRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");
const { getArticles, getArticleById } = require("../controllers/articles");

articlesRouter
  .route("/")
  .get(getArticles)
  .all(methodNotAllowed);
articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .all(methodNotAllowed);

module.exports = articlesRouter;
