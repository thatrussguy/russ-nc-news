const connection = require("../db/connection");

const selectUserById = username => {
  return connection("users")
    .where({ username })
    .first()
    .then(user => ({ user }));
};
const insertUser = ({ username, avatar_url, name }) => {
  return connection("users")
    .insert({ username, avatar_url, name })
    .returning("*")
    .then(([user]) => ({ user }));
};
const selectUsers = () => {
  return connection("users").then(users => ({ users }));
};

module.exports = { selectUserById, insertUser, selectUsers };
