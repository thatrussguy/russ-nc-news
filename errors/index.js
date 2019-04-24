exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: "Route Not Found" });
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};

exports.handle500 = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ message: err.message });
  else next(err);
};

exports.handlePsqlErrors = (err, req, res, next) => {
  if (err.code) {
    const errorReference = {
      "23503": { status: 404, message: err.detail },
      "22P02": { status: 400, message: err.stack.split("\n")[0] },
      "42703": { status: 400, message: err.stack.split("\n")[0] },
      "22003": { status: 400, message: err.stack.split("\n")[0] },
      "23502": { status: 400, message: err.stack.split("\n")[0] }
    };
    res
      .status(errorReference[err.code].status || 500)
      .send(
        { message: errorReference[err.code].message } ||
          `Unknown PSQL error ${err.code}`
      );
  } else next(err);
};
