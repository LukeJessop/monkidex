SELECT c.*, u.username, u.profile_picture FROM monkey_comments c
INNER JOIN users u ON u.user_id = c.author_id
WHERE destination_id = $1;