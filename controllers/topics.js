const selectTopics = require("../models/topics");

exports.getTopics = (_, res, next) => {
  selectTopics()
    .then(topics => res.send(topics))
    .catch(next);
};
