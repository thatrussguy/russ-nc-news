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
    .limit(limit)
    .offset((p - 1) * limit);
};
const selectArticleById = articleId => {
  return connection("articles")
    .select("articles.*")
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .count("comments.article_id AS comment_count")
    .groupBy("articles.article_id")
    .where({ "articles.article_id": articleId })
    .first()
    .then(article => ({ article }));
};
const updateArticleById = (article_id, votes = 0) => {
  return connection("articles")
    .where({ article_id })
    .increment({ votes });
};
const insertArticle = ({ title, body, topic, author }) => {
  return connection("articles")
    .insert({ title, body, topic, author })
    .returning("*")
    .then(([{ article_id }]) => selectArticleById(article_id));
};
const removeArticleById = article_id => {
  return connection("articles")
    .delete()
    .where({ article_id });
};

const countArticles = ({ author, topic }) => {
  return connection("articles")
    .count("article_id AS total_count")
    .modify(query => {
      if (author) query.where({ "articles.author": author });
      if (topic) query.where({ topic });
    })
    .then(([{ total_count }]) => total_count);
};

module.exports = {
  selectArticles,
  selectArticleById,
  updateArticleById,
  insertArticle,
  removeArticleById,
  countArticles
};
