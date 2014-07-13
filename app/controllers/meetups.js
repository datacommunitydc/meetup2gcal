/**
 *  app/controllers/meetups.js
 *  Controllers for the meetups endpoints
 *
 *  Author:   Benjamin Bengfort <benb@datacommunitydc.org>
 *  Created:  Sun Jul 13 13:57:30 2014 -0400
 *
 *  Copyright (C) 2014 Data Community DC
 *  For license information, see LICENSE.txt
 *
 *  ID: meetups.js [] benb@datacommunitydc.org $
 */

// JS Hint directives and strict mode
/* globals exports,__filename */
'use strict';

//////////////////////////////////////////////////////////////////////////
// Require dependencies
//////////////////////////////////////////////////////////////////////////

var Q       = require('q');
var _       = require('underscore');
var Meetup  = require('../models/meetup');

//////////////////////////////////////////////////////////////////////////
// List endpoints
//////////////////////////////////////////////////////////////////////////

/**
 * Lists all the meetups for display on an HTML page
 *
 * @param  {Request}  req the request currently being handled
 * @param  {Response} res the response to be sent
 * @return {null}
 */
exports.list = function(req, res) {

  Q(Meetup.find().exec())
    .then(function(meetups) {
      var context = {
        title: 'meetup2gcal | All Meetups',
        meetups: meetups,
        user: req.user
      };

      res.render('meetups/list', context);
    },
    function(err) {
      throw err;
    }).fail(function(err) {
      throw err;
    });

};
