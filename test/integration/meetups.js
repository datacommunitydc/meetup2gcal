/**
 *  test/integration/meetups.js
 *  Tests for the meetups controllers
 *
 *  Author:   Benjamin Bengfort <benb@datacommunitydc.org>
 *  Created:  Sun Jul 13 14:06:36 2014 -0400
 *
 *  Copyright (C) 2014 Data Community DC
 *  For license information, see LICENSE.txt
 *
 *  ID: meetups.js [] benb@datacommunitydc.org $
 */

// JS Hint directives and strict mode
/* globals exports,__filename */
'use strict';

module.exports = function() {

  var expect = require('chai').expect
    , _      = require('underscore')
    , logger = require('../../app/utils/lumberjack');

  describe('Meetups Controller Tests', function() {

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
    // GET /meetups endpoint tests
    //////////////////////////////////////////////////////////////////////

    describe('GET /meetups', function() {

      it('should render a meetups table');

      it('should have a list of meetups in the context');

      it('should require authentication to view');

      it('should have the logged in user in the context');

    });

  });

};
