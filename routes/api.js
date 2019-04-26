const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const apiRouter = require("express").Router();

const topicsRouter = require("./topics");
const articlesRouter = require("./articles");
const commentsRouter = require("./comments");
const usersRouter = require("./users");
const authRouter = require("./auth");

const { methodNotAllowed } = require("../errors");
const { getApiDescription } = require("../controllers/api");

apiRouter.use("/login", authRouter);

apiRouter.use((req, _, next) => {
  const { authorization } = req.headers;
  let token;
  if (authorization) {
    token = authorization.split(" ")[1];
  }
  jwt.verify(token, JWT_SECRET, (err, _) => {
    if (err) next({ status: 401, message: "Unauthorised" });
    else next();
  });
});

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/users", usersRouter);

apiRouter
  .route("/")
  .get(getApiDescription)
  .all(methodNotAllowed);

module.exports = apiRouter;
