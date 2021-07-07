const express = require("express");
const helmet = require("helmet");
const logger = require("./checkForMiddleware");

const userRouter = require("../users/userRouter");
const postRouter = require("../posts/postRouter");

const server = express();

// call middleware
server.use(express.json());
server.use(helmet());
server.use(logger);

server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware - found in ~/api/checkForMiddleware.js

module.exports = server;
