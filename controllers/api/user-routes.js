const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
// can add in a withAuth function here

// GET /api/users
router.get('/', (req, res) => {
    User.findAll({
        // attributes: { exclude: ['password'] }
    })
    .then(data => res.json(data))
    .catch(err => {
        console.error(err);
        res.status(500).json(err);
    });
});

// GET /api/users/id


// POST /api/users
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(data => {
        // req.session.save(() => {
        //     req.session.user_id = data.id;
        //     req.session.username = data.username;
        //     req.session.loggedIn = true;
        
        // });
        res.json(data);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

// DELETE a user

module.exports = router;