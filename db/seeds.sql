INSERT INTO user (username, email, password)
VALUES
('Alex', 'test@test.com', 12345),
('Jamie', 'test1@test.com', 12345),
('Eleanor', 'test2@test.com', 12345),
('Joe', 'test3@test.com', 12345),
('Richard', 'test4@test.com', 12345);

INSERT INTO post (title, user_id)
VALUES
('This is the first post created, pretty cool right?', 1),
('This is the second post created, not as cool tbh.', 2),
('This is the third post created, nuff said', 3),
('This is the fourth post created.', 4),
('This is the fifth post created', 5),
('This is the sixth post created', 1),
('This is the seventh post created', 4);

INSERT INTO comment (comment_text, user_id, post_id)
VALUES
('This first post is so cool.', 2, 1),
('I love it!', 3, 1),
('Second is meh.', 1, 2),
('Third the golden bird!', 4, 3),
('What a bland post.', 1, 4);