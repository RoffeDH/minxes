const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('./../db/models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index/index');
})

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('index/login', req.flash());
});

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('index/register');
});

/* GET logout page */
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

/* POST login. */
router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: 'Could not login with those credentials', successRedirect: '/users/me' }));

/* POST register. */
router.post('/register', function(req, res, next) {
  User.register(new User({ email: req.body.email }), req.body.password, function(err, user) {
    if (err) {
      return res.render('index/register', {error: 'Sorry, username already in use'});
      next();
    }
    req.login(user, function(err) {
        if (err) {
          console.log(err);
        }
        return res.redirect('/users/me');
      });
  });
});

module.exports = router;
