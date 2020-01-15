const express = require("express");
const userDb = require("./userDb");

const router = express.Router();

router.post("/", (req, res) => {
  // do your magic!
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

router.get("/", (req, res) => {
  userDb
    .get(req.query)
    .then(users => {
      userDb.length
        ? res.status(404).json({ error_message: "Users not found.." })
        : res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error_message: "Something happened when getting the users" });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  userDb.getById(req.params.id).then(user => res.status(200).json(user));
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  userDb
    .getById(req.params.id)
    .then(user => {
      if (user) {
        user = req.user;
        next();
      } else {
        res.status(404).json({ message: "invalid user id" });
      }
      return req.user;
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({
          error_message: "Something happened when validating the user id"
        });
    });
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
