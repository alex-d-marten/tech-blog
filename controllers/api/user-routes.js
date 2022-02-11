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
        console.log(err);
        res.status(500).json(err);
    });
});

// GET /api/users/id
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(data => res.json(data))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})


// POST /api/users
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(data => {
        req.session.save(() => {
            req.session.user_id = data.id;
            req.session.username = data.username;
            req.session.loggedIn = true;
        
        });
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
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(data => res.json(data))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })

})

// logout route
router.post('/logout', (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    }
    else {
        res.status(404).end();
    }
})

module.exports = router;