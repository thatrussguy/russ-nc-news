const connection = require("../db/connection");

const selectArticles = () => {
  return connection("articles")
    .select("articles.*")
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .count("comments.article_id AS comment_count")
    .groupBy("articles.article_id")
    .then(articlesWithBody => {
      const articles = articlesWithBody.map(({ body, ...rest }) => ({
        ...rest
      }));
      return { articles };
    });
};

module.exports = selectArticles;
