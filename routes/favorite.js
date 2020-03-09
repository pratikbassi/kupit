const express = require("express");
const router = express.Router();
const checkLogin = require("./middlewares/checkLogin");
const { fetchFavItems, favItem, unFavItem } = require("./helpers/favHelper");

module.exports = db => {
  router.get("/favorite/:userId", checkLogin, (req, res) => {
    fetchFavItems(db, req.params.userId).then(favorites => {
      if (!favorites) {
        res.send({ error: "Something wrong happens" });
        return;
      } else {
        res.json(favorites);
      }
    });
  });
  router.post("/favorite/:itemId", checkLogin, (req, res) => {
    favItem(db, req.session.user.id, req.params.itemId).then(favorite => {
      if (!favorite) {
        res.send({ error: "Something wrong happens" });
        return;
      } else {
        res.json(favorite);
      }
    });
  });
  router.delete("/favorite/:itemId", checkLogin, (req, res) => {
    unFavItem(db, req.session.user.id, req.params.itemId).then(favorite => {
      if (!favorite) {
        res.send({ error: "Something wrong happens" });
        return;
      } else {
        res.json(favorite);
      }
    });
  });
  return router;
};
