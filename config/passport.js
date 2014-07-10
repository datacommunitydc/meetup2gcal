/**
 *  passport.js
 *  Configuration for the passport (authentication) module
 *
 *  Author:   Benjamin Bengfort <benb@datacommunitydc.org>
 *  Created:  Thu Jul 10 11:32:00 2014 -0400
 *
 *  Copyright (C) 2014 Data Community DC
 *  For license information, see LICENSE.txt
 *
 *  ID: passport.js [] benb@datacommunitydc.org $
 */

// JS Hint directives and strict mode
/* globals exports,__filename */
'use strict';

//////////////////////////////////////////////////////////////////////////
// Configuration requirements
//////////////////////////////////////////////////////////////////////////

var User     = require('../app/models/user');
var config   = require('./application');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//////////////////////////////////////////////////////////////////////////
// Export Configurable function
//////////////////////////////////////////////////////////////////////////

module.exports = function(passport) {

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // Code for Google Strategy
  passport.use(new GoogleStrategy({
      clientID     : config.auth.googleAuth.clientID,
      clientSecret : config.auth.googleAuth.clientSecret,
      callbackURL  : config.auth.googleAuth.callbackURL
    },
    function(token, refreshToken, profile, done) {

      // make the code asynchronous
      // User.findOne won't fire until we have all our data back from Google
      process.nextTick(function() {

        // try to find the suer based on their google id
        User.findOne({'google.id' : profile.id }, function(err, user) {
          // 500 on error
          if (err) return done(err);

          if (user) {
            // if a user is found, log them in.
            return done(null, user);
          } else {
            // the user isn't in the database, create a new user
            var newUser = new User();

            // set all the relevant information
            newUser.google.id = profile.id;
            newUser.google.token = token;
            newUser.name = profile.displayName;
            newUser.email = profile.emails[0].value;

            // Save the user
            newUser.save(function(err) {
              if (err) throw err;
              return done(null, newUser);
            });
          }

        });

      });

    }));

};

