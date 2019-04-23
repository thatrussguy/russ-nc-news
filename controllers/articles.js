const {
  selectArticles,
  selectArticleById,
  updateArticleById
} = require("../models/articles");
const { selectCommentsByArticleId } = require("../models/comments");

exports.getArticles = (req, res, next) => {
  selectArticles()
    .then(articles => {
      res.send(articles);
    })
    .catch(next);
};
exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then(article => {
      res.send(article);
    })
    .catch(next);
};
exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  updateArticleById(article_id, inc_votes)
    .then(_ => selectArticleById(article_id))
    .then(article => {
      res.send(article);
    })
    .catch(next);
};
exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  selectCommentsByArticleId(article_id)
    .then(comments => {
      res.send(comments);
    })
    .catch(next);
};
