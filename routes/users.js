const express = require('express');
const router = express.Router();
const User = require('../db/models/user');

const {isLoggedIn} = require('./../middleware/middleware');

router.use(isLoggedIn);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET logged in user. */
router.get('/me', function(req, res, next) {
  console.log(req.user);
  res.render('users/me');
});

/* POST update user */
router.post('/me', function(req, res, next) {
  User.find()
});

module.exports = router;
