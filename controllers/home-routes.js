const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');


// homepage route
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
        console.log(posts)
        res.render('homepage', { 
            posts,
            loggedIn: req.session.loggedIn 
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
})

// GET post by id


// login route
router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login', {
        loggedIn: req.session.loggedIn
    });
})

// signup route
router.get('/signup', (req, res) => {
    res.render('signup');
})



module.exports = router;