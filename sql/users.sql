DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first VARCHAR(200) NOT NULL,
    last VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    pw VARCHAR(300) NOT NULL,
    image VARCHAR(300) DEFAULT 'https://mypracticesn.s3.amazonaws.com/defaultProfilePic.jpg',
    bio VARCHAR(300),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
