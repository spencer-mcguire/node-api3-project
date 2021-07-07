const express = require("express");
const postDb = require("./postDb");

const router = express.Router();

router.get("/", (req, res) => {
  postDb.get(req.query).then(posts => res.status(200).json(posts));
});

router.get("/:id", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
