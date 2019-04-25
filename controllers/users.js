const { selectUserById, insertUser } = require("../models/users");

exports.getUserById = (req, res, next) => {
  const { username } = req.params;
  selectUserById(username)
    .then(user => {
      if (!user.user)
        return Promise.reject({
          status: 404,
          message: `No such user: ${username}`
        });
      else res.send(user);
    })
    .catch(next);
};
exports.postUser = (req, res, next) => {
  insertUser(req.body)
    .then(user => res.status(201).send(user))
    .catch(next);
};
