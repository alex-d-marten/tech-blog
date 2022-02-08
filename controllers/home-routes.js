const router = require('express').Router();
const sequelize = require('../config/connection');


// homepage route
router.get('/', (req, res) => {
    res.render('homepage')
})

module.exports = router;