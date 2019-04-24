const connection = require("../db/connection");

const selectArticles = ({
  author,
  topic,
  sort_by = "created_at",
  order = "desc",
  limit = 10,
  p = 1
}) => {
  return connection("articles")
    .select(
      "articles.article_id AS article_id",
      "articles.author AS author",
      "articles.created_at AS created_at",
      "title",
      "topic",
      "articles.votes AS votes"
    )
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .count("comments.article_id AS comment_count")
    .groupBy("articles.article_id")
    .orderBy(sort_by, order)
    .modify(query => {
      if (author) query.where({ "articles.author": author });
      if (topic) query.where({ topic });
    })
    .then(articles => ({
      articles: articles.slice((p - 1) * limit, p * limit),
      total_count: articles.length
    }));
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
const updateArticleById = (article_id, votes = 0) => {
  return connection("articles")
    .where({ article_id })
    .increment({ votes });
};

module.exports = { selectArticles, selectArticleById, updateArticleById };
