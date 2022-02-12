const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

// GET /api/posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(data => {
        const posts = data.map(post => post.get({ plain: true }))
        res.render('homepage', { posts })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
})

// GET /api/posts/:id
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(data => {
        if(!data) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(data)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
});

// CREATE a new post POST /api/posts
router.post('/', (req, res) => {
    Post.create({
        title: req.body.title,
        user_id: req.body.user_id
    })
    .then(data => res.json(data))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

// update a posts title PUT /api/posts/:id
router.put('/:id', (req, res) => {
    Post.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(data => {
        if(!data) {
            res.status(404).json({ message: 'No posts found with this id' });
            return;
        }
        res.json(data)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

// DELETE a post by id DELETE /api/posts/:id
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(data => {
        if(!data) {
            res.status(404).json({ message: 'No posts found with this id' });
            return;
        }
        res.json(data)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router;