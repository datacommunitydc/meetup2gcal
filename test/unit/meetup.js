/**
 *  test/unit/meetup.js
 *  Unit tests for the Meetup model.
 *
 *  Author:   Benjamin Bengfort <benb@datacommunitydc.org>
 *  Created:  Sun Jul 13 12:28:45 2014 -0400
 *
 *  Copyright (C) 2014 Data Community DC
 *  For license information, see LICENSE.txt
 *
 *  ID: meetup.js [] benb@datacommunitydc.org $
 */

// JS Hint directives and strict mode
/* globals exports,__filename */
'use strict';

module.exports = function() {

  var expect = require('chai').expect
    , _ = require('underscore')
    , Q = require('q')
    , mongoose = require('mongoose');

  var Meetup = mongoose.model('Meetup');

  describe('Meetup Model Unit Tests', function() {

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

    it('should have tests');

  });

};
