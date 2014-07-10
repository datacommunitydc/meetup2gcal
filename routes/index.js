var express  = require('express');
var passport = require('passport');
var router   = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'meetup2gcal', user: req.user });
});

/* Temporary place holders for authentication routes */

// route middleware to make sure a user is logged in.
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}

router.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile', { user: req.user });
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', { successRedirect : '/profile', failureRedirect : '/'}));

module.exports = router;

