const express = require("express");
const router = express.Router();
//const checkAdmin = require("./middlewares/checkAdmin");
const checkLogin = require("./middlewares/checkLogin");
const {
  getItemWithId,
  addItem,
  markSold,
  removeItem
} = require("./helpers/itemHelper");

const checkOwner = function(db, itemId) {
  return db.query(`SELECT * FROM items WHERE id= $1;`, [itemId]).then(res => {
    const item = res.rows;
    if (item) {
      return Promise.resolve(item[0].user_id);
    } else {
      return Promise.resolve(null);
    }
  });
};

module.exports = db => {
  //Fetch single item with id
  router.get("/items/:itemId", (req, res) => {
    getItemWithId(db, req.params.itemId)
      .then(item => {
        res.send(item[0]);
        //res.render("item", item[0]);
      })
      .catch(e => res.send(e));
  });

  //Render item_new ejs page
  router.get("/item/new", checkLogin, (req, res) => {
    res.render("item_new");
  });

  //List a new item
  router.post("/item/new", checkLogin, (req, res) => {
    const newItem = req.body;
    newItem.user_id = req.session.user.id;
    addItem(db, newItem).then(item => {
      if (!item) {
        res.send({ error: "Something wrong happens" });
        return;
      } else {
        res.redirect("/");
      }
    });
  });

  //Mark sold with Id
  router.put("/item/sold/:itemId", checkLogin, (req, res) => {
    checkOwner(db, req.params.itemId).then(ownerId => {
      if (ownerId === req.session.user.id) {
        markSold(db, req.params.itemId).then(item => {
          if (!item) {
            res.send({ error: "Something wrong happens" });
            return;
          } else {
            res.redirect("/");
          }
        });
      } else {
        res.send({ error: "You are not allowed to update this item." });
      }
    });
  });

  //'Remove' item
  router.put("/item/delete/:itemId", checkLogin, (req, res) => {
    checkOwner(db, req.params.itemId).then(ownerId => {
      if (ownerId === req.session.user.id) {
        removeItem(db, req.params.itemId).then(item => {
          if (!item) {
            res.send({ error: "Something wrong happens" });
            return;
          } else {
            res.redirect("/");
          }
        });
      } else {
        res.send({ error: "You are not allowed to update this item." });
      }
    });
  });
  return router;
};