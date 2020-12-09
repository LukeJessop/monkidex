SELECT p.*, u.username FROM posts p
JOIN users u ON u.user_id = p.author_id
WHERE p.post_id = $1;