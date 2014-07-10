var express = require('express');
var router = express.Router();
var User   = require('../app/models/user');
var Q      = require('q');
var _      = require('underscore');

// route middleware to make sure a user is logged in.
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}

/* GET users listing. */
router.get('/', isLoggedIn, function(req, res) {
  Q(User.find().exec())
    .then(function(users) {
      res.render('users', {title: 'meetup2gcal | All Users', users: users, user: req.user});
    },
    function(err) {
      throw err;
    }).fail(function(err) {
      throw err;
    });
});

module.exports = router;
