const authRouter = require("express").Router();

const { methodNotAllowed } = require("../errors");
const { authenticateUser } = require("../controllers/auth");

authRouter
  .route("/")
  .post(authenticateUser)
  .all(methodNotAllowed);

module.exports = authRouter;
