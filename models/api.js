const { apiDescription } = require("../endpoints");

exports.readApiDescription = () => {
  return new Promise((resolve, reject) => resolve(apiDescription));
};
