DROP TABLE IF EXISTS friendships;

CREATE TABLE friendships(
    id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES users(id) NOT NULL,
    recipient_id INTEGER NOT NULL,
    status VARCHAR(200) NOT NULL
);
