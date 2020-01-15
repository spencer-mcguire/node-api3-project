/// middleware lives here

function logger(req, res, next) {
  const { method, originalUrl } = req;
  console.log(`${method} to ${originalUrl} `, Date());
  next();
}

module.exports = logger;
