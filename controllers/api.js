const { readApiDescription } = require("../models/api.js");

exports.getApiDescription = (req, res, next) => {
  readApiDescription()
    .then(description => {
      res.send(description);
    })
    .catch(next);
};
