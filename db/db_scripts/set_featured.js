const { Pool } = require("pg");

const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "midterm"
});

const set_featured = function() {
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  return pool
    .query(
      `SELECT id FROM items WHERE is_viewable = true; UPDATE items SET is_featured = false;`
    )
    .then(res => {
      const count = res.rows.length;
      let featuredIDs = [];
      for (let i = 0; i < 20; i++) {
        featuredIDs.push(getRandomInt(count));
      }
      return pool
        .query(
          `UPDATE items SET is_featured = true WHERE is_viewable = true AND id = ANY ($1); `,
          [featuredIDs]
        )
        .then(res => res.rows);
    })
    .then(res => res.rows)
    .catch(err => err);
};

module.exports = { set_featured };
