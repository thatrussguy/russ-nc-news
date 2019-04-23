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

module.exports = { selectCommentsByArticleId, insertCommentByArticleId };
