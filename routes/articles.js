const articlesRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");
const {
  getArticles,
  getArticleById,
  patchArticleById,
  getCommentsByArticleId
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
articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .all(methodNotAllowed);

module.exports = articlesRouter;
