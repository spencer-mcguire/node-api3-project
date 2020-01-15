const express = require("express");
const userDb = require("./userDb");

const router = express.Router();

router.post("/", validateUser("name"), (req, res) => {
  userDb
    .insert(req.body)
    .then(newUser => res.status(201).json(newUser))
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error_message: "Something happened when creating the user" });
    });
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
  userDb
    .getById(req.user)
    .then(user => res.status(200).json(user))
    .catch(err => console.log(err));
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
        next(req.user);
      } else {
        res.status(400).json({ message: "invalid user id" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error_message: "Something happened when validating the user id"
      });
    });
}

// function validateUser(req, res, next) {
//   if (!req.body) {
//     res.status(400).json({ message: "missing user data" });
//   } else if (!req.body.name) {
//     res.status(400).json({ message: "missing required name field" });
//   } else {
//     next();
//   }
// }
function validateUser(prop) {
  return function(req, res, next) {
    if (!req.body) {
      res.status(400).json({ message: "missing user data" });
    } else if (!req.body[prop]) {
      res.status(400).json({ message: `missing required ${prop} field` });
    } else {
      next();
    }
  };
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
