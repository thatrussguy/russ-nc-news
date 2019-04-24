const apiRouter = require("express").Router();

const topicsRouter = require("./topics");
const articlesRouter = require("./articles");
const commentsRouter = require("./comments");
const usersRouter = require("./users");

const { methodNotAllowed } = require("../errors");
const { getApiDescription } = require("../controllers/api");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/users", usersRouter);

apiRouter
  .route("/")
  .get(getApiDescription)
  .all(methodNotAllowed);

module.exports = apiRouter;
