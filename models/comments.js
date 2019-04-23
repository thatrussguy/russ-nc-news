const connection = require("../db/connection");

const selectCommentsByArticleId = article_id => {
  return connection("comments")
    .select("comment_id", "author", "body", "created_at", "votes")
    .where({ article_id })
    .then(comments => ({ comments }));
};

module.exports = { selectCommentsByArticleId };
