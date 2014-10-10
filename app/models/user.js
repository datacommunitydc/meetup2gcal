/**
 *  app/models/user.js
 *  User Profile model for user authentication with node
 *
 *  Author:   Benjamin Bengfort <benb@datacommunitydc.org>
 *  Created:  Thu Jul 10 12:14:14 2014 -0400
 *
 *  Copyright (C) 2014 Data Community DC
 *  For license information, see LICENSE.txt
 *
 *  ID: user.js [] benb@datacommunitydc.org $
 */

// JS Hint directives and strict mode
/* globals exports,__filename */
'use strict';

//////////////////////////////////////////////////////////////////////////
// Requires
//////////////////////////////////////////////////////////////////////////

var _ = require('underscore');
var Q = require('q');
var crypto   = require('crypto');
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');
var qs       = require('querystring');
var config   = require('../../config/application');

//////////////////////////////////////////////////////////////////////////
// UserSchema
//////////////////////////////////////////////////////////////////////////

var UserSchema = new Schema({
  email             : { type: String, required: true },
  username          : { type: String, required: true },
  name              : { type: String, required: true },
  password          : { type: String, required: false },
  avatar            : { type: String, required: false },
  google            : {
    id              : { type: String, required: false },
    token           : { type: String, required: false },
  },
  created           : { type: Date, required: true, default: Date.now },
  updated           : { type: Date, required: true, default: Date.now },
  last_login        : { type: Date, required: false, default: Date.now }
});

//////////////////////////////////////////////////////////////////////////
// Plugins
//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
// Indexes
//////////////////////////////////////////////////////////////////////////

UserSchema.path('email').index({ unique: true });
UserSchema.path('username').index({ unique: true });
UserSchema.path('google.id').index({ unique: true });

//////////////////////////////////////////////////////////////////////////
// Validation
//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
// Hooks
//////////////////////////////////////////////////////////////////////////

/**
 * Ensure that various dates are updated.
 * Ensure that a password is hashed.
 *
 * @param  {Function} next callback
 * @return {null}
 */
UserSchema.pre('save', function(next) {
  var self = this;
  var now  = new Date();
  self.updated = now;

  // Use first part of email as username if username is null
  if (!self.username) {
    self.username = self.email.split('@')[0];
  }

  // Ensure a unique username
  self.ensureUnique()
    .then(function(user) {
      next();
    }, next).fail(next);

});

//////////////////////////////////////////////////////////////////////////
// Instance Methods
//////////////////////////////////////////////////////////////////////////

/**
 * Create a hash from the password for local storage.
 *
 * @param  {String} password the password to hash
 * @return {String}          the password hashed
 */
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

/**
 * Check if a password is valid.
 *
 * @param  {String}  password the password to check
 * @return {Boolean}          if the password is valid or not
 */
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

/**
 * Ensures that the username is unqiue by recursively slugifying usernames
 * that are found in the database until a unique one is found.
 *
 * @return {Promise} returns a promise since this is dealing with db.
 */
UserSchema.methods.ensureUnique = function() {
  var self  = this;
  var query = { _id: { '$ne': self._id }, username: self.username };

  return Q(UserModel.find(query).exec())
    .then(function(users) {
      if (users.length > 0) {

        // Test and increment
        var pattern = /^[\w-]+-(\d+)$/i;
        if (pattern.test(self.username)) {
          // Already a -n in the slug, so increment
          var parts = self.username.match(pattern);
          var next  = parseInt(parts[1]) + 1;
          self.username = self.username.replace(/-\d+(?=[^\d]*$)/i, '-' + next.toString());
        } else {
          // First time adding a -n to the slug
          self.username = self.username + '-1';
        }

        // Recursive ensure unique
        return self.ensureUnique();
      }

      // Recursive termination condition;
      return Q(self);
    });
};

/**
 * Checks if the user is an admin or not based on their email address.
 * This is very simple checking; since we are using Google Apps for auth,
 * we simply check if the user has an email address in a provided set of
 * domains -- if so; they're an admin! It's not terribly secure, but it is 
 * sufficient.
 * @return {Boolean} If the user is an admin.
 */
UserSchema.methods.isAdmin = function() {
  var domain = this.email.split('@')[1].toLowerCase();
  if (config.adminDomains.indexOf(domain) >= 0) {
    return true;
  } else {
    return false;
  }
}

//////////////////////////////////////////////////////////////////////////
// Virtual Properties
//////////////////////////////////////////////////////////////////////////

UserSchema.virtual('gravatar').get(function() {
  var baseURL   = "http://s.gravatar.com/avatar/";
  var query     = qs.stringify({'d': 'mm', 's': 200});
  var emailHash = crypto.createHash('md5').update(this.email.toLowerCase().trim()).digest('hex');
  return baseURL + emailHash + '?' + query;
});

//////////////////////////////////////////////////////////////////////////
// Static Methods
//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
// Return
//////////////////////////////////////////////////////////////////////////

// return the model object, but keep a local reference
var UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
