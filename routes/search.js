const express = require("express");
const router = express.Router();
const generalSearch = require("../db/db_scripts/search_function");

module.exports = db => {
  router.get("/search", (req, res) => {
    if (req.query.keyword || req.query.min_price || req.query.max_price) {
      generalSearch(db, req.query).then(items => {
        if (!items) {
          res.send({ error: "Something wrong happens" });
          return;
        } else {
          res.send(items);
        }
      });
    } else {
      res.json({ error: "Search terms can't be empty." });
    }
  });
  return router;
};
