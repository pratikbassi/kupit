const fetchFavItems = function(db, userId) {
  return db
    .query(`SELECT item_id,date FROM favorites WHERE user_id=$1`, [userId])
    .then(res => {
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
