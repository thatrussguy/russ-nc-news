const usersRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");
const { getUserById, postUser } = require("../controllers/users");

usersRouter
  .route("/")
  .post(postUser)
  .all(methodNotAllowed);
usersRouter
  .route("/:username")
  .get(getUserById)
  .all(methodNotAllowed);

module.exports = usersRouter;
