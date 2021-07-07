/// middleware lives here

function logger(req, res, next) {
  const { method, originalUrl } = req;
  console.log(`${method} to ${originalUrl} at`, Date());
  next();
}

module.exports = logger;
