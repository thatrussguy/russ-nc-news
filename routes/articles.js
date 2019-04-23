const articlesRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");
const {
  getArticles,
  getArticleById,
  patchArticleById
} = require("../controllers/articles");

articlesRouter
  .route("/")
  .get(getArticles)
  .all(methodNotAllowed);
articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById)
  .all(methodNotAllowed);

module.exports = articlesRouter;
