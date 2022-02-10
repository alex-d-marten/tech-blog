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

// POST /login
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then((data) => {
        if(!data) {
            res.status(400).json({ message: 'No User found with this username.' });
            return;
        }

        // validate the user
        const validPassword = data.checkPassword(req.body.password)

        if(!validPassword) {
            res.status(404).json({ message: 'Invalid password.' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = data.id,
            req.session.username = data.username,
            req.session.loggedIn = true;

            res.json({ user: data, message: 'You have been logged in successfully.' })
        })
    })
})

// DELETE a user

module.exports = router;