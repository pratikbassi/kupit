const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const getUserWithEmail = function(email) {
  return db
    .query(
      `
  SELECT * FROM users
  WHERE email = $1
  `,
      [email]
    )
    .then(res => {
      const user = res.rows;
      if (user) {
        return Promise.resolve(user[0]);
      } else {
        return Promise.resolve(null);
      }
    });
};

const addUser = function(user) {
  return db
    .query(
      `
INSERT INTO users(name,email,password,phone_number)
VALUES($1,$2,$3,$4)
RETURNING *;
`,
      [user.name, user.email, user.password, user.phone_number]
    )
    .then(res => {
      const user = res.rows;
      if (user) {
        return Promise.resolve(user[0]);
      } else {
        return Promise.resolve(null);
      }
    });
};

// Login or Register
router.post("/login", (req, res) => {
  // req.body email, password, phone_num can't be empty
  if (
    req.body.email === "" ||
    req.body.password === "" ||
    req.body.phone_number
  ) {
    res.send({ error: "Entities can't be empty" });
  }
  // Check if the user has already existed, return null if not existed
  getUserWithEmail(req.body.email).then(user => {
    //Login OR Register
    if (user) {
      //Check password
      const isMatch = bcrypt.compareSync(req.body.password, user.password);
      if (isMatch) {
        req.session.userId = user.id;
        res.redirect("/");
      } else {
        res.send({ error: "Invalid credentials" });
      }
    } else {
      const newUser = req.body;
      newUser.password = bcrypt.hashSync(newUser.password, 12);
      addUser(newUser)
        .then(user => {
          if (!user) {
            res.send({ error: "Something wrong happens" });
            return;
          }
          req.session.userId = user.id;
          res.redirect("/");
        })
        .catch(e => res.send(e));
    }
  });
});

// Logout
router.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});

module.exports = router;
