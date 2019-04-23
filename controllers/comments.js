const { updateCommentById } = require("../models/comments");

exports.patchCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  updateCommentById(comment_id, inc_votes)
    .then(comment => {
      res.send(comment);
    })
    .catch(next);
};
