const connection = require("../db/connection");

const selectCommentsByArticleId = (
  article_id,
  { sort_by = "created_at", order = "desc" }
) => {
  return connection("comments")
    .select("comment_id", "author", "body", "created_at", "votes")
    .where({ article_id })
    .orderBy(sort_by, order)
    .then(comments => ({ comments }));
};
const insertCommentByArticleId = (article_id, author, body) => {
  return connection("comments")
    .insert({ article_id, author, body })
    .returning("*")
    .then(([comment]) => ({ comment }));
};
const updateCommentById = (comment_id, votes = 0) => {
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
