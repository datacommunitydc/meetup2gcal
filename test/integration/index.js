/**
 *  test/integration/index.js
 *  Tests for the index controllers
 *
 *  Author:   Benjamin Bengfort <benb@datacommunitydc.org>
 *  Created:  Thu Jul 10 22:26:49 2014 -0400
 *
 *  Copyright (C) 2014 Data Community DC
 *  For license information, see LICENSE.txt
 *
 *  ID: index.js [] benb@datacommunitydc.org $
 */

// JS Hint directives and strict mode
/* globals exports,__filename */
'use strict';

module.exports = function() {

  var expect = require('chai').expect
    , _      = require('underscore')
    , logger = require('../../app/utils/lumberjack');

  describe('Index Controller Tests', function() {

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
    // GET / endpoint tests
    //////////////////////////////////////////////////////////////////////

    describe('GET /', function() {

      it('should render the home page');

      it('should have a title and a user object in context');

    });

  });

};
