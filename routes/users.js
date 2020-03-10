const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const getUserWithEmail = function(db, email) {
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

const addUser = function(db, user) {
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

module.exports = db => {
  router.post("/login", (req, res) => {
    if (req.body.email && req.body.password) {
      getUserWithEmail(db, req.body.email)
        .then(user => {
          if (user) {
            const isMatch = bcrypt.compareSync(
              req.body.password,
              user.password
            );
            if (isMatch) {
              req.session.user = user;
              res.redirect("/");
            } else {
              res.send({ error: "Invalid credentials" });
            }
          } else {
            res.json("Email not found, please register first.");
          }
        })
        .catch(e => res.send(e));
    } else {
      res.send({ error: "Entities can't be empty" });
    }
  });

  router.post("/register", (req, res) => {
    if (
      req.body.email &&
      req.body.password &&
      req.body.phone_number &&
      req.body.name
    ) {
      getUserWithEmail(db, req.body.email).then(user => {
        if (user) {
          res.send({ error: "Email already existed, please use other emails" });
        } else {
          const newUser = req.body;
          newUser.password = bcrypt.hashSync(newUser.password, 12);
          addUser(db, newUser)
            .then(user => {
              if (!user) {
                res.send({ error: "Something wrong happens" });
                return;
              } else {
                req.session.user = user;
                res.redirect("/");
              }
            })
            .catch(e => res.send(e));
        }
      });
    } else {
      res.send({ error: "Entities can't be empty" });
    }
  });

  // Logout
  router.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
  });

  return router;
};
