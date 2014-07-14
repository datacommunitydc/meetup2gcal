/**
 *  test/unit/user.js
 *  Unit tests for the User model.
 *
 *  Author:   Benjamin Bengfort <benb@datacommunitydc.org>
 *  Created:  Thu Jul 10 13:06:37 2014 -0400
 *
 *  Copyright (C) 2014 Data Community DC
 *  For license information, see LICENSE.txt
 *
 *  ID: user.js [] benb@datacommunitydc.org $
 */

// JS Hint directives and strict mode
/* globals exports,__filename */
'use strict';

module.exports = function() {

  var expect = require('chai').expect
    , _ = require('underscore')
    , Q = require('q')
    , mongoose = require('mongoose');

  var User = mongoose.model('User');

  describe('User Model Unit Tests', function() {

    before(function(done) {
      done();
    });

    beforeEach(function(done) {
      done();
    });

    afterEach(function(done) {
      done();
    });

    after(function(done) {
      done();
    });

    it('should hash passwords before saving them');

    it('should be able to verify a hashed password');

    it('should require the email and name');

    it('should have created and updated timestamps on create');

    it('should have an updated date on save');

    it('should ensure the username is unique');

    it('should ensure the email is unique');

    it('should use the first part of the email as the username if not provided');

    it('should increment the username if a duplicate exists');

    it('should ensure unique usernames recursively');

    it('should return false on isAdmin if the user has a @gmail email account');

    it('should return true on isAdmin if the user has an @datacommunitydc email account');

    it('should ensure isAdmin is case insensitive when checking the domain');

  });

};
