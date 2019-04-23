const { selectUserById } = require("../models/users");

exports.getUserById = (req, res, next) => {
  const { username } = req.params;
  selectUserById(username)
    .then(user => {
      res.send(user);
    })
    .catch(next);
};
