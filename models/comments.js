const connection = require("../db/connection");

const selectCommentsByArticleId = article_id => {
  return connection("comments")
    .select("comment_id", "author", "body", "created_at", "votes")
    .where({ article_id })
    .then(comments => ({ comments }));
};
const insertCommentByArticleId = (article_id, author, body) => {
  return connection("comments")
    .insert({ article_id, author, body })
    .returning("*")
    .then(([comment]) => ({ comment }));
};
const updateCommentById = (comment_id, votes) => {
  return connection("comments")
    .where({ comment_id })
    .increment({ votes })
    .returning("*")
    .then(([comment]) => ({ comment }));
};
const removeCommentById = comment_id => {
  return connection("comments")
    .delete()
    .where({ comment_id });
};

module.exports = {
  selectCommentsByArticleId,
  insertCommentByArticleId,
  updateCommentById,
  removeCommentById
};
