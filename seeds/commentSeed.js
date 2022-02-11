const { Comment } = require('../models');

const commentData = [
    {
        "comment_text": "This first post is so cool!",
        "user_id": 2,
        "post_id": 1
    },
    {
        "comment_text": "I love it!",
        "user_id": 3,
        "post_id": 1
    },
    {
        "comment_text": "Second is meh.",
        "user_id": 1,
        "post_id": 2
    },
    {
        "comment_text": "Third the golden bird!",
        "user_id": 4,
        "post_id": 3
    },
    {
        "comment_text": "What a bland post.",
        "user_id": 1,
        "post_id": 4
    },
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;