/**
 *  app/models/user.js
 *  User Profile model for user authentication with node
 *
 *  Author:   Benjamin Bengfort <ben@cobrain.com>
 *  Created:  Thu Jul 10 12:14:14 2014 -0400
 *
 *  Copyright (C) 2014 Cobrain Company
 *  For license information, see LICENSE.txt
 *
 *  ID: user.js [] ben@cobrain.com $
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

//////////////////////////////////////////////////////////////////////////
// UserSchema
//////////////////////////////////////////////////////////////////////////

var UserSchema = new Schema({
  email             : { type: String, required: true },
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

  next();
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
