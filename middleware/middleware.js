module.exports = {
    isLoggedIn: function(req, res, next) {
      if (req.user) {
          return next();
      } else {
          return res.redirect('/login');
      }
        return next();
    }
}
