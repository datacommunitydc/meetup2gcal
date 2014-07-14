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

      it('should render HTML if the content type is text/html');

      it('should render HTML if the content type is */*');

      it('should render JSON if the content type is application/json');

    });

    //////////////////////////////////////////////////////////////////////
    // POST /meetups endpoint tests
    //////////////////////////////////////////////////////////////////////

    describe('POST /meetups', function() {

      it('should require authentication to view');

      it('should accept a urlname (slug) as a parameter');

      it('should redirect back to GET /meetups when done');

      it('should give flash messages as reporting');

      it('should message the front end when it can\'t find a meetup slug');

      it('should create a meetup if it found one that didn\'t exist');

      it('should update a meetup if it found one that already exists');

      it('should have the logged in user in the context');

      it('should render HTML if the content type is text/html');

      it('should render HTML if the content type is */*');

      it('should render JSON if the content type is application/json');

    });

  });

};
