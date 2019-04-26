exports.authenticateUser = (req, res, next) => {
  const userPasswords = { username: "password" };
  const { username, password } = req.body;
  if (!username || password !== userPasswords[username])
    next({ status: 401, message: "invalid username or password" });
  else res.send("logged in");
};
