// SELECT id, user_id, is_sold, price, image_url, description, title, posting_date, stock, city
// FROM items
// WHERE is_viewable IS TRUE
// AND LOWER(title) LIKE '%item%'
// AND price < 10000
// and price > 6;

const { Pool } = require('pg')

const pool = new Pool ({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

const user_data_search = function (user_id) {
  let values = [user_id];
  let queryString = `
    SELECT id, name, email, phone_number, profile_picture
    FROM users
    WHERE $1 = users.id;
  `;

  return pool.query(queryString, values).then(res => res.rows[0]).catch(err => err);
}

exports.user_data_search = user_data_search;
