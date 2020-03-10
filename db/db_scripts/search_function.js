const general_search = function(db, options) {
  let values = [];
  let queryString = `
  SELECT id, user_id, is_sold, price, image_url, description, title, posting_date, stock, city
  FROM ITEMS
  WHERE is_viewable IS TRUE
  `;

  if (options.keyword) {
    values.push("%" + options.keyword.toLowerCase() + "%");
    queryString += `
    AND LOWER(title) LIKE $${values.length}
    `;
  }
  if (options.min_price) {
    values.push(options.min_price);
    queryString += `
    AND price >= $${values.length}
    `;
  }
  if (options.max_price) {
    values.push(options.max_price);
    queryString += `
    AND price <= $${values.length}
    `;
  }
  if (options.user) {
    values.push(options.user);
    queryString += `
    AND user_id = $${values.length}
    `;
  }

  queryString += `;`;

  return db
    .query(queryString, values)
    .then(res => res.rows)
    .catch(err => err);
};

module.exports = general_search;
