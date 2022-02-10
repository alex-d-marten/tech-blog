const router = require('express').Router();
const sequelize = require('../config/connection');


// homepage route
router.get('/', (req, res) => {
    res.render('homepage')
})

// login route
router.get('/login', (req, res) => {
    res.render('login');
})

// signup route
router.get('/signup', (req, res) => {
    res.render('signup');
})

module.exports = router;