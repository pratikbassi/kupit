const { Pool } = require("pg");

const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "midterm"
});

const set_featured = function() {
  // let queryString = `SELECT COUNT(*) FROM items WHERE is_viewable = true`;

  // pool.query(queryString);

  // pool.query(`UPDATE items SET is_featured = false`);
  // pool.query(`UPDATE items SET is_featured = true WHERE id IN $1`);
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  return pool
    .query(
      `SELECT id FROM items WHERE is_viewable = true; UPDATE items SET is_featured = false;`
    )
    .then(res => {
      console.log("promise1", res.rows, res.rows.length);
      const count = res.rows.length;
      console.log("randomInt", getRandomInt(count));
      let featuredIDs = [];
      for (let i = 0; i < 20; i++) {
        featuredIDs.push(getRandomInt(count));
      }
      console.log(featuredIDs);
      // return featuredIDs;

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

set_featured();
