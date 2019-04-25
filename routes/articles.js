const articlesRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");
const {
  getArticles,
  getArticleById,
  patchArticleById,
  getCommentsByArticleId,
  postCommentByArticleId,
  postArticle,
  deleteArticleById
} = require("../controllers/articles");

articlesRouter
  .route("/")
  .get(getArticles)
  .post(postArticle)
  .all(methodNotAllowed);
articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById)
  .delete(deleteArticleById)
  .all(methodNotAllowed);
articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postCommentByArticleId)
  .all(methodNotAllowed);

module.exports = articlesRouter;
