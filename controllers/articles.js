const {
  selectArticles,
  selectArticleById,
  updateArticleById
} = require("../models/articles");

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
exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  updateArticleById(article_id, inc_votes)
    .then(article => {
      res.send(article);
    })
    .catch(next);
};
