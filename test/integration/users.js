/**
 *  test/integration/users.js
 *  Tests for the users controllers
 *
 *  Author:   Benjamin Bengfort <benb@datacommunitydc.org>
 *  Created:  Thu Jul 10 22:26:49 2014 -0400
 *
 *  Copyright (C) 2014 Data Community DC
 *  For license information, see LICENSE.txt
 *
 *  ID: users.js [] benb@datacommunitydc.org $
 */

// JS Hint directives and strict mode
/* globals exports,__filename */
'use strict';

module.exports = function() {

  var expect = require('chai').expect
    , _      = require('underscore')
    , logger = require('../../app/utils/lumberjack');

  describe('Users Controller Tests', function() {

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

    //////////////////////////////////////////////////////////////////////
    // GET /users endpoint tests
    //////////////////////////////////////////////////////////////////////

    describe('GET /users', function() {

      it('should render a users table');

      it('should have a list of users in the context');

      it('should require authentication to view');

      it('should have the logged in user in the context');

    });

  });

};
