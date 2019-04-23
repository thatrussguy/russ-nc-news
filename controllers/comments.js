const { updateCommentById, removeCommentById } = require("../models/comments");

exports.patchCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  updateCommentById(comment_id, inc_votes)
    .then(comment => {
      if (!comment.comment) next({ status: 400, message: "No such comment" });
      else res.send(comment);
    })
    .catch(next);
};
exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentById(comment_id)
    .then(res.status(204).send())
    .catch(next);
};
