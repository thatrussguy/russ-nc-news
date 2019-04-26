const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

exports.authenticateUser = (req, res, next) => {
  const userPasswords = { username: "password" };
  const { username, password } = req.body;
  if (!username || password !== userPasswords[username])
    next({ status: 401, message: "invalid username or password" });
  else {
    const token = jwt.sign({ user: username, iat: Date.now() }, JWT_SECRET);
    res.send({ token });
  }
};
