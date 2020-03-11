const fetchFavItems = function(db, userId, itemId = null) {
  let queryString = `
  SELECT items.*, favorites.id AS fav_id, favorites.date AS fav_date
  FROM items
  LEFT JOIN favorites ON items.id = favorites.item_id
  WHERE favorites.user_id = $1
  `;
  let values = [userId];
  if (itemId) {
    queryString += `
    AND item_id = $2
    ORDER BY favorites.date
    LIMIT 1`;
    values.push(itemId);
  } else {
    queryString += `ORDER BY favorites.date`;
  }

  return db.query(queryString, values).then(res => {
    const favorites = res.rows;
    if (favorites) {
      return Promise.resolve(favorites);
    } else {
      return Promise.resolve(null);
    }
  });
};

const favItem = function(db, userId, itemId) {
  return db
    .query(
      `INSERT INTO favorites(user_id,item_id) VALUES($1,$2) RETURNING *;`,
      [userId, itemId]
    )
    .then(res => {
      const favorite = res.rows;
      if (favorite) {
        return Promise.resolve(favorite[0]);
      } else {
        return Promise.resolve(null);
      }
    });
};

const unFavItem = function(db, userId, itemId) {
  return db
    .query(
      `DELETE FROM favorites WHERE user_id=$1 AND item_id=$2 RETURNING *;`,
      [userId, itemId]
    )
    .then(res => {
      const favorite = res.rows;
      if (favorite) {
        return Promise.resolve(favorite[0]);
      } else {
        return Promise.resolve(null);
      }
    });
};

module.exports = { fetchFavItems, favItem, unFavItem };
