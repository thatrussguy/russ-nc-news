const connection = require("../db/connection");

const selectTopics = () => {
  return connection("topics").then(topics => ({ topics }));
};
const insertTopic = ({ slug, description }) => {
  return connection("topics")
    .insert({ slug, description })
    .returning("*")
    .then(([topic]) => ({ topic }));
};

module.exports = { selectTopics, insertTopic };
