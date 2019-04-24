const connection = require("../db/connection");

const selectUserById = username => {
  return connection("users")
    .where({ username })
    .first()
    .then(user => ({ user }));
};

module.exports = { selectUserById };
