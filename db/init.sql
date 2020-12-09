CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    img_link TEXT NOT NULL,
    author_id INT REFERENCES users (user_id)
)