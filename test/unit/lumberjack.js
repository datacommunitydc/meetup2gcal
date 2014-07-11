/**
 *  test/unit/lumberjack.js
 *  Tests for the lumberjack utility
 *
 *  Author:   Benjamin Bengfort <benb@datacommunitydc.org>
 *  Created:  Thu Jul 10 22:22:06 2014 -0400
 *
 *  Copyright (C) 2014 Data Community DC
 *  For license information, see LICENSE.txt
 *
 *  ID: lumberjack.js [] benb@datacommunitydc.org $
 */

// JS Hint directives and strict mode
/* globals exports,__filename */
'use strict';

module.exports = function() {

  var expect = require('chai').expect
    , _      = require('underscore')
    , logger = require('../../app/utils/lumberjack');

  describe('Lumberjack Utility Unit Tests', function() {

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

    it('should implement an audit level');

    it('should implement an access level');

    it('should add start time to the response');

    it('should log the response using the response format');

    it('should log the response using the common log format');

  });

};
