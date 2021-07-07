const express = require("express");
const userDb = require("./userDb");
const postDb = require("../posts/postDb");

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

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  const newPost = { ...req.body, user_id: req.user.id };

  postDb
    .insert(newPost)
    .then(post => res.status(201).json(post))
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error_message: "Something happened when submitting the post" });
    });
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
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res
      .status(500)
      .json({ error_message: "Something happened when getting the user" });
  }
  // userDb
  //   .getById(req.user.id)
  //   .then(user => res.status(200).json(user))
  //   .catch(err => console.log(err));
});

router.get("/:id/posts", validateUserId, (req, res) => {
  userDb
    .getUserPosts(req.user.id)
    .then(posts => res.status(200).json(posts))
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error_message: "Something happened when getting the users posts"
      });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  userDb
    .remove(req.user.id)
    .then(removed =>
      res.status(200).json({
        records_deleted: removed,
        message: `${req.user.name} was deleted.`
      })
    )
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error_message: "user was not removed"
      });
    });
});

router.put("/:id", validateUserId, validateUser("name"), (req, res) => {
  userDb
    .update(req.user.id, req.body)
    .then(updated => {
      userDb
        .getById(req.user.id)
        .then(user =>
          res.status(200).json({ updated_records: updated, data: user })
        );
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error_message: "Something happened when updating the user."
      });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  userDb
    .getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user;
        // console.log(req.user);
        next();
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

function validateUser(prop) {
  return function(req, res, next) {
    if (Object.entries(req.body).length === 0) {
      res.status(400).json({ message: "missing user data" });
    } else if (!req.body[prop]) {
      res.status(400).json({ message: `missing required ${prop} field` });
    } else {
      next();
    }
  };
}

function validatePost(req, res, next) {
  if (Object.entries(req.body).length === 0) {
    res.status(400).json({ message: "missing post data" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = router;
