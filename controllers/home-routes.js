const router = require('express').Router();
const sequelize = require('../config/connection');


// homepage route
router.get('/', (req, res) => {
    res.render('homepage', {
        loggedIn: req.session.loggedIn
    })
})

// login route
router.get('/login', (req, res) => {
    res.render('login', {
        loggedIn: req.session.loggedIn
    });
})

// signup route
router.get('/signup', (req, res) => {
    res.render('signup');
})

module.exports = router;