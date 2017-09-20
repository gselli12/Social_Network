DROP TABLE IF EXISTS wallposts;

CREATE TABLE wallposts(
    id SERIAL PRIMARY KEY,
    writer_id INTEGER REFERENCES users(id) NOT NULL,
    profile_id INTEGER REFERENCES users(id) NOT NULL,
    post VARCHAR(600) NOT NULL,
    image VARCHAR(300),
    link VARCHAR(300),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
