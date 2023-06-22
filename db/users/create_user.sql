INSERT INTO monkeys (username, password)
VALUES ($1, $2)
RETURNING *;