/**
 *  app/controllers/auth.js
 *  Controllers for the authentication routes of the app.
 *
 *  Author:   Benjamin Bengfort <benb@datacommunitydc.org>
 *  Created:  Thu Jul 10 21:04:25 2014 -0400
 *
 *  Copyright (C) 2014 Data Community DC
 *  For license information, see LICENSE.txt
 *
 *  ID: auth.js [] benb@datacommunitydc.org $
 */

// JS Hint directives and strict mode
/* globals exports,__filename */
'use strict';

//////////////////////////////////////////////////////////////////////////
// Requires at top of the file
//////////////////////////////////////////////////////////////////////////

var _ = require('underscore')
  , Q = require('q');

///////////////////////////////////////////////////////////////////////////
// Profile route
//////////////////////////////////////////////////////////////////////////

/**
 * Renders a profile view with the specified context
 *
 * @param  {Request}  req the request currently being handled
 * @param  {Response} res the response to be sent
 * @return {null}
 */
exports.profile = function(req, res) {
  var context = {
    user: req.user
  };

  res.render('profile', context);
};

/**
 * Logs out the user and redirects them to the home page
 *
 * @param  {Request}  req the request currently being handled
 * @param  {Response} res the response to be sent
 * @return {null}
 */
exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};
