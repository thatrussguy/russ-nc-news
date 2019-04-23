const connection = require("../db/connection");

const selectTopics = () => {
  return connection("topics")
    .select()
    .then(topics => ({ topics }));
};

module.exports = selectTopics;
