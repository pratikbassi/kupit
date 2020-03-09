const express = require("express");
const router = express.Router();
const generalSearch = require("../db/db_scripts/search_function");

module.exports = db => {
  router.get("/search", (req, res) => {
    generalSearch(db, req.query).then(items => {
      if (!items) {
        res.send({ error: "Something wrong happens" });
        return;
      } else {
        res.send(items);
      }
    });
  });

  return router;
};
