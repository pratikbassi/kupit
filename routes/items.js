const express = require("express");
const router = express.Router();
const checkAdmin = require("./checkAdmin");

//Retrive single item on item display page
module.exports = db => {
  const getItemWithId = function(db, id) {
    return db
      .query(
        `
    SELECT * FROM items
    WHERE id = $1
    `,
        [id]
      )
      .then(res => {
        const item = res.rows;
        if (item) {
          return Promise.resolve(item);
        } else {
          return Promise.resolve(null);
        }
      });
  };

  const addItem = function(db, item) {
    return db
      .query(
        `
  INSERT INTO items(user_id,price,description,title,stock,city)
  VALUES($1,$2,$3,$4,$5,$6)
  RETURNING *;
  `,
        [
          item.user_id,
          item.price,
          item.description,
          item.title,
          item.stock,
          item.city
        ]
      )
      .then(res => {
        const item = res.rows;
        if (item) {
          return Promise.resolve(item[0]);
        } else {
          return Promise.resolve(null);
        }
      });
  };

  //Fetch single item with id
  router.get("/items/:itemId", (req, res) => {
    getItemWithId(db, req.params.itemId)
      .then(item => {
        res.send(item[0]);
        //res.render("item", item[0]);
      })
      .catch(e => res.send(e));
  });

  //**** ADMIN ROUTES */
  //Render item_new ejs page
  router.get("/item/new", checkAdmin, (req, res) => {
    res.render("item_new");
  });

  //List a new item
  router.post("/item/new", checkAdmin, (req, res) => {
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
  //Mark sold
  router.put("/item/sold/:itemId", checkAdmin, (req, res) => {});
  //'Remove' item
  router.put("/item/delete/:itemId", checkAdmin, (req, res) => {});
  return router;
};
