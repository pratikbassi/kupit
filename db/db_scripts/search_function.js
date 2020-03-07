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

const general_search = function (options) {
  let values = [];
  let queryString = `
  SELECT id, user_id, is_sold, price, image_url, description, title, posting_date, stock, city
  FROM ITEMS
  WHERE is_viewable IS TRUE
  `;

  if (options.keyword) {
    values.push('%' + options.keyword + '%')
    queryString += `
    AND LOWER(title) LIKE $${values.length}
    `
  }
  if (options.min_price) {
    values.push(options.min_price)
    queryString += `
    AND price > $${values.length}
    `
  }
  if (options.max_price) {
    values.push(options.max_price)
    queryString += `
    AND price < $${values.length}
    `
  }

  queryString += `;`

  return pool.query(queryString, values).then(res => res.rows).catch(err => err);
}

exports.general_search = general_search;
