const apiRouter = require("express").Router();

const topicsRouter = require("./topics");
const articlesRouter = require("./articles");
const commentsRouter = require("./comments");
const usersRouter = require("./users");
const authRouter = require("./auth");

const { methodNotAllowed } = require("../errors");
const { getApiDescription } = require("../controllers/api");
const { checkToken } = require("../controllers/auth");

apiRouter.use("/login", authRouter);

apiRouter.use(checkToken);

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/users", usersRouter);

apiRouter
  .route("/")
  .get(getApiDescription)
  .all(methodNotAllowed);

module.exports = apiRouter;
