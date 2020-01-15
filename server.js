const express = require("express");
const helmet = require("helmet");

const server = express();

// call middleware
server.use(express.json());
server.use(helmet());
server.use(logger);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const { method, originalUrl } = req;
  console.log(`${method} to ${originalUrl} `, Date());
  next();
}

module.exports = server;
