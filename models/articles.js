const connection = require("../db/connection");

const selectArticles = () => {
  return connection("articles")
    .select(
      "articles.article_id",
      "articles.author",
      "articles.created_at",
      "title",
      "topic",
      "articles.votes"
    )
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .count("comments.article_id AS comment_count")
    .groupBy("articles.article_id")
    .then(articles => ({ articles }));
};
const selectArticleById = articleId => {
  return connection("articles")
    .select("articles.*")
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .count("comments.article_id AS comment_count")
    .groupBy("articles.article_id")
    .where("articles.article_id", "=", articleId)
    .first()
    .then(article => ({ article }));
};

module.exports = { selectArticles, selectArticleById };
