const { apiDescription } = require("../endpoints");

exports.readApiDescription = () => {
  return new Promise((resolve, _) => resolve(apiDescription));
};
