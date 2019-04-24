const { readApiDescription } = require("../models/api.js");

exports.getApiDescription = (_, res, next) => {
  readApiDescription()
    .then(description => {
      res.send(description);
    })
    .catch(next);
};
