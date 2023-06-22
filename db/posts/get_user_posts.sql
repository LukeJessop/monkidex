SELECT p.*, u.username FROM creations p
JOIN users u ON u.user_id = p.author_id
WHERE author_id = $1;