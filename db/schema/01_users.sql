-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users
CASCADE;

CREATE TABLE users
(
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  profile_picture VARCHAR(255) DEFAULT 'https://i.imgur.com/4GyU6gt.mp4'
);


GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public to labber;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public to labber;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public to labber;
