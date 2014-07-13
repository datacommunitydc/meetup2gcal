/**
 *  app/controllers/index.js
 *  Controllers for the index or home routes and static pages.
 *
 *  Author:   Benjamin Bengfort <benb@datacommunitydc.org>
 *  Created:  Thu Jul 10 21:16:25 2014 -0400
 *
 *  Copyright (C) 2014 Data Community DC
 *  For license information, see LICENSE.txt
 *
 *  ID: index.js [] benb@datacommunitydc.org $
 */

// JS Hint directives and strict mode
/* globals exports,__filename */
'use strict';

//////////////////////////////////////////////////////////////////////////
// Static page routes
//////////////////////////////////////////////////////////////////////////

/**
 * Displays the home page
 *
 * @param  {Request}  req the request currently being handled
 * @param  {Response} res the response to be sent
 * @return {null}
 */
exports.index = function(req, res) {
  var context = {
    title: 'meetup2gcal',
    user: req.user
  }

  res.render('index', context);
};

/**
 * Heartbeat endpoint that returns if the app is up or not
 *
 * @param  {Request}  req the request currently being handled
 * @param  {Response} res the response to be sent
 * @return {null}
 */
exports.alive = function(req, res) {
  var context =  {
    alive: true,
    now: new Date()
  }

  res.type('application/json');
  res.json(context);
};
