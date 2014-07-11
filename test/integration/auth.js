/**
 *  test/integration/auth.js
 *  Tests for the auth controllers
 *
 *  Author:   Benjamin Bengfort <benb@datacommunitydc.org>
 *  Created:  Thu Jul 10 22:26:49 2014 -0400
 *
 *  Copyright (C) 2014 Data Community DC
 *  For license information, see LICENSE.txt
 *
 *  ID: auth.js [] benb@datacommunitydc.org $
 */

// JS Hint directives and strict mode
/* globals exports,__filename */
'use strict';

module.exports = function() {

  var expect = require('chai').expect
    , _      = require('underscore')
    , logger = require('../../app/utils/lumberjack');

  describe('Auth Controller Tests', function() {

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
    // GET /profile endpoint tests
    //////////////////////////////////////////////////////////////////////

    describe('GET /profile', function() {

      it('should render a profile view');

      it('should require authentication to view');

      it('should have the logged in user in the context');

    });

    //////////////////////////////////////////////////////////////////////
    // GET /auth/logout endpoint tests
    //////////////////////////////////////////////////////////////////////

    describe('GET /auth/logout', function() {

      it('should log out the currently logged in user');

      it('should redirect back to the index page');

    });

  });

};
