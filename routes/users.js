const usersRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");
const { getUserById, postUser, getUsers } = require("../controllers/users");

usersRouter
  .route("/")
  .post(postUser)
  .get(getUsers)
  .all(methodNotAllowed);
usersRouter
  .route("/:username")
  .get(getUserById)
  .all(methodNotAllowed);

module.exports = usersRouter;
