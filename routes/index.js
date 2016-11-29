const express = require('express');
const router = express.Router();
const passport = require('passport');

const Account = require('./../db/models/account');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
})

router.get('/login', function(req, res, next) {
  res.render('login', req.flash());
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: 'Could not login with those credentials', successRedirect: '/' }));

router.post('/register', function(req, res, next) {
    Account.register(new Account({ username: req.body.username }), req.body.password, function(err, account) {
      if (err) {
        return res.render('register', {error: 'Sorry, username already in use'});
        next();
      }

      passport.authenticate('local')(req, res, function() {
        res.redirect('/');
        next();
      });
    });
});

module.exports = router;
