/**
 *  app/controllers/users.js
 *  Controllers for the users endpoints
 *
 *  Author:   Benjamin Bengfort <benb@datacommunitydc.org>
 *  Created:  Thu Jul 10 21:11:45 2014 -0400
 *
 *  Copyright (C) 2014 Data Community DC
 *  For license information, see LICENSE.txt
 *
 *  ID: users.js [] benb@datacommunitydc.org $
 */

// JS Hint directives and strict mode
/* globals exports,__filename */
'use strict';

//////////////////////////////////////////////////////////////////////////
// Require dependencies
//////////////////////////////////////////////////////////////////////////

var User     = require('../models/user');
var Q        = require('q');
var _        = require('underscore');
var helpers  = require('../utils/helpers');
var tossback = helpers.tossback;

//////////////////////////////////////////////////////////////////////////
// List endpoints
//////////////////////////////////////////////////////////////////////////

/**
 * Lists all the users for display on an HTML page
 *
 * @param  {Request}  req the request currently being handled
 * @param  {Response} res the response to be sent
 * @return {null}
 */
exports.list = function(req, res, next) {

  var context = {
    title: 'DC2 Events | All Users',
    user: req.user
  }

  Q(User.find().exec())
    .then(function(users) {
      context.users = users;
      res.render('users', context);
    }, tossback(next))
    .fail(tossback(next));
};
