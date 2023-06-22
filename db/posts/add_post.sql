INSERT INTO creations (description, img_link, author_id, likes)
VALUES ($1, $2, $3, 0)
RETURNING *;