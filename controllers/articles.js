const selectArticles = require("../models/articles");

exports.getArticles = (req, res, next) => {
  selectArticles()
    .then(articles => {
      res.send(articles);
    })
    .catch(next);
};
