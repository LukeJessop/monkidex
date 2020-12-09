INSERT INTO posts (description, img_link, author_id)
VALUES ($1, $2, $3)
RETURNING *;