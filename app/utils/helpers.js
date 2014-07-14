/**
 *  app/utils/helpers.js
 *  Helper functions for things that are used across controlers
 *
 *  Author:   Benjamin Bengfort <benb@datacommunitydc.org>
 *  Created:  Mon Jul 14 12:47:49 2014 -0400
 *
 *  Copyright (C) 2014 Data Community DC
 *  For license information, see LICENSE.txt
 *
 *  ID: helpers.js [] benb@datacommunitydc.org $
 */

// JS Hint directives and strict mode
/* globals exports,__filename */
'use strict';

//////////////////////////////////////////////////////////////////////////
// Requires
//////////////////////////////////////////////////////////////////////////

var _ = require('underscore')
  , Q = require('q')
  , mongoose = require('mongoose');

//////////////////////////////////////////////////////////////////////////
// Controller helpers
//////////////////////////////////////////////////////////////////////////

/**
 * Compiles all all the flash messages into a single object that can be
 * used in the context - especially with the Jade mixin found in the
 * template file includes/alerts
 *
 * @param  {Request} req the request object containing the flash messages
 * @return {Array}       the list of messages that have been flashed
 */
exports.getFlashMessages = function(req) {
  var messages = [];
  _.each(['success', 'info', 'warning', 'danger'], function(key) {
    _.extend(messages, _.map(_.unique(req.flash(key)), function(msg) {
      return {
        type: key,
        message: msg
      };
    }));
  });

  return messages;
};

/**
 * An asynchronous error handler for use in Q promises to ensure that a
 * 500 error gets sent even in Async calls.
 *
 * @param  {Function} next the next callback from the middleware
 * @return {null}
 */
exports.tossback = function(next) {
  return function(err) {
    next(err);
  };
};
