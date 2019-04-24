const { updateCommentById, removeCommentById } = require("../models/comments");

exports.patchCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  updateCommentById(comment_id, inc_votes)
    .then(comment => {
      if (!comment.comment)
        return Promise.reject({
          status: 404,
          message: `No such comment: ${comment_id}`
        });
      else res.send(comment);
    })
    .catch(next);
};
exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentById(comment_id)
    .then(rowsAffected => {
      if (rowsAffected === 1) res.sendStatus(204);
      else
        return Promise.reject({
          status: 404,
          message: `No such comment: ${comment_id}`
        });
    })
    .catch(next);
};
