const {
  selectArticles,
  selectArticleById,
  updateArticleById
} = require("../models/articles");
const {
  selectCommentsByArticleId,
  insertCommentByArticleId
} = require("../models/comments");

exports.getArticles = (req, res, next) => {
  selectArticles(req.query)
    .then(articles => {
      if (!articles.articles.length)
        return Promise.reject({
          status: 404,
          message: `No articles match query: ${JSON.stringify(req.query)}`
        });
      else res.send(articles);
    })
    .catch(next);
};
exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then(article => {
      if (!article.article)
        return Promise.reject({
          status: 404,
          message: `No such article: ${article_id}`
        });
      else res.send(article);
    })
    .catch(next);
};
exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  updateArticleById(article_id, inc_votes)
    .then(() => selectArticleById(article_id))
    .then(article => {
      res.send(article);
    })
    .catch(next);
};
exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then(article => {
      if (!article.article)
        return Promise.reject({
          status: 404,
          message: `No such article: ${article_id}`
        });
      else return selectCommentsByArticleId(article_id, req.query);
    })
    .then(comments => {
      res.send(comments);
    })
    .catch(next);
};
exports.postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;

  insertCommentByArticleId(article_id, username, body)
    .then(comment => res.status(201).send(comment))
    .catch(next);
};
