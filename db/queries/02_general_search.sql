SELECT id, user_id, is_sold, price, image_url, description, title, posting_date, stock, city
FROM items
WHERE is_viewable IS TRUE
AND LOWER(title) LIKE '%tem%'
AND price < 10000
and price > 6;

