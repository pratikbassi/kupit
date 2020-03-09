-- Users table seeds here (Example)
INSERT INTO users
  (name, email, phone_number, password)
VALUES
  ('alice', 'alice@gmail.com', '111-111-1111', 'password'),
  ('sam', 'sam@gmail.com', '111-111-1112', 'password'),
  ('paul', 'paul@gmail.com', '111-111-1113', 'password'),
  ('greg', 'greg@gmail.com', '111-111-1114', 'password'),
  ('joe', 'joe@gmail.com', '111-111-1115', 'password'),
  ('john', 'john@gmail.com', '111-111-1116', 'password'),
  ('steve', 'steve@gmail.com', '111-111-1117', 'password'),
  ('emily', 'emily@gmail.com', '111-111-1118', 'password'),
  ('chris', 'chris@gmail.com', '111-111-1119', 'password'),
  ('sarah', 'sarah@gmail.com', '111-111-1110', 'password'),
  ('melanie', 'melanie@gmail.com', '111-111-1101', 'password');

-- Items table seeds here (Example)
INSERT INTO items
  (user_id, price, description, title, stock, city)
VALUES
  (1, 5, 'ITEM DESCRIPTION', 'ITEM TITLE', 5, 'vancouver'),
  (2, 22, 'ITEM DESCRIPTION', 'ITEM TITLE', 10, 'toronto'),
  (3, 1, 'ITEM DESCRIPTION', 'ITEM TITLE', 4, 'seattle'),
  (4, 1245124, 'ITEM DESCRIPTION', 'ITEM TITLE', 3, 'vancouver'),
  (5, 54645, 'ITEM DESCRIPTION', 'ITEM TITLE', 55, 'toronto'),
  (6, 9, 'ITEM DESCRIPTION', 'ITEM TITLE', 10000, 'vancouver'),
  (7, 47, 'ITEM DESCRIPTION', 'ITEM TITLE', 45, 'seattle'),
  (8, 595, 'ITEM DESCRIPTION', 'ITEM TITLE', 12412, 'toronto'),
  (9, 1111, 'ITEM DESCRIPTION', 'ITEM TITLE', 11, 'seattle'),
  (10, 509, 'ITEM DESCRIPTION', 'ITEM TITLE', 69, 'vancouver');

-- Featured Item Seeds here
INSERT INTO items
  (user_id, price, description, title, stock, city, is_featured, is_sold, image_url)
VALUES
  (1, 5, 'THIS IS THE FEATURED ITEM DESCRIPTION', 'FEATURED TITLE1', 5, 'vancouver', true, false, 'https://i.imgur.com/vWMtBlG.mp4'),
  (2, 22, 'THIS IS THE FEATURED ITEM DESCRIPTION', 'FEATURED TITLE2', 10, 'richmond', true, false, 'https://i.imgur.com/0nwgKwWb.jpg'),
  (3, 1, 'THIS IS THE FEATURED ITEM DESCRIPTION', 'FEATURED TITLE3', 4, 'seattle', true, false, 'https://i.imgur.com/A0GvReVb.jpg'),
  (2, 1245124, 'THIS IS THE FEATURED ITEM DESCRIPTION', 'FEATURED TITLE4', 3, 'tokyo', true, true, 'https://i.imgur.com/Ux7EJNMb.jpg'),
  (5, 54645, 'THIS IS THE FEATURED ITEM DESCRIPTION', 'FEATURED TITLE5', 55, 'hello', true, false, 'https://i.imgur.com/22wjtIZb.jpg'),
  (6, 9, 'THIS IS THE FEATURED ITEM DESCRIPTION', 'FEATURED TITLE6', 10000, 'vancouver', true, true, 'https://i.imgur.com/PyHlOz6b.jpg'),
  (7, 47, 'THIS IS THE FEATURED ITEM DESCRIPTION', 'FEATURED TITLE7', 45, 'help im trapped', true, false, 'https://i.imgur.com/GaC5ID1b.jpg');

INSERT INTO favorites
  (user_id, item_id)
VALUES
  (1 , 1),
  (1 , 2),
  (1 , 3),
  (2 , 1),
  (3 , 1),
  (4 , 1);

INSERT INTO messages
  (sender, reciever, item_id, body )
VALUES
  (1, 2, 1, 'LOVE IT'),
  (2, 3, 1, 'HATE IT'),
  (1, 3, 1, 'NEED IT'),
  (2, 1, 1, 'WANT IT'),
  (3, 1, 1, 'BOUGHT IT'),
  (3, 2, 1, 'SOLD IT');
