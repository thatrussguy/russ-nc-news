const commentsRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");

const {
  patchCommentById,
  deleteCommentById
} = require("../controllers/comments");

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentById)
  .delete(deleteCommentById)
  .all(methodNotAllowed);

module.exports = commentsRouter;
