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
const markSold = function(db, itemId) {
  return db
    .query(`UPDATE items SET is_sold = TRUE WHERE id= $1 RETURNING *;`, [
      itemId
    ])
    .then(res => {
      const item = res.rows;
      if (item) {
        return Promise.resolve(item[0]);
      } else {
        return Promise.resolve(null);
      }
    });
};
const removeItem = function(db, itemId) {
  return db
    .query(`UPDATE items SET is_viewable = FALSE WHERE id= $1 RETURNING *;`, [
      itemId
    ])
    .then(res => {
      const item = res.rows;
      if (item) {
        return Promise.resolve(item[0]);
      } else {
        return Promise.resolve(null);
      }
    });
};

module.exports = { getItemWithId, addItem, markSold, removeItem };
