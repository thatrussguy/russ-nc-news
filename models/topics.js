const connection = require("../db/connection");

const selectTopics = () => {
  return connection("topics").then(topics => ({ topics }));
};

module.exports = selectTopics;
