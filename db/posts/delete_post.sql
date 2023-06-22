DELETE FROM creations
WHERE post_id = $1;

DELETE FROM monkey_comments
WHERE destination_id = $1;

SELECT * FROM creations