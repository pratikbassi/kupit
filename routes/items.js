const express = require("express");
const router = express.Router();

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

  router.get("/items/:itemId", (req, res) => {
    getItemWithId(db, req.params.itemId)
      .then(item => {
        res.send(item[0]);
        //res.render("item", item[0]);
      })
      .catch(e => res.send(e));
  });
  return router;
};
