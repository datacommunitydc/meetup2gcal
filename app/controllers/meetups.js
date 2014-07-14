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
var config  = require('../../config/application');
var meetapi = require('meetup-api')(config.meetup.apiKey);
var logger  = require('../utils/lumberjack');

var tossback = function(next) {
  return function(err) {
    next(err);
  };
}

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
exports.list = function(req, res, next) {

  Q(Meetup.find().exec())
    .then(function(meetups) {

      // Respond based on the content type.
      res.format({

        html: function() {
          var context = {
            title: 'DC2 Events | All Meetups',
            meetups: meetups,
            user: req.user,
            messages: {
              success: _.unique(req.flash('success')),
              info: _.unique(req.flash('info')),
              error: _.unique(req.flash('error'))
            }
          };

          res.render('meetups/list', context);
        },

        // Untested
        json: function() {
          res.send({
            meetups: meetups
          });
        }

      });


    },tossback(next))
    .fail(tossback(next));

};

//////////////////////////////////////////////////////////////////////////
// CRUD endpoints
//////////////////////////////////////////////////////////////////////////

/**
 * Create an endpoint from a POST
 *
 * @param  {Request}  req the request currently being handled
 * @param  {Response} res the response to be sent
 * @return {null}
 */
exports.create = function(req, res, next) {
  // Get the parameters from the post.
  var slug = req.body.slug;

  // Go to the Meetup API to fetch the data about the group
  Q.ninvoke(meetapi, 'getGroups', {group_urlname: slug})
    .then(function(results) {

      if (results.results.length == 0) {
        logger.info("Searched for Meetup group '" + slug +"' but could not locate it.");
        req.flash("error", "Could not find a Meetup with url slug \"" + slug + "\".");
        res.redirect('/meetups');
      }

      var result = results.results[0];
      var query  = { meetup_id: result.id };

      // Search for an existing group with that ID
      Q(Meetup.findOne(query).exec())
        .then(function(meetup) {

          if (!meetup) {
            // Create a new Meetup group
            Q(Meetup.create({
              meetup_id         : result.id,
              name              : result.name,
              urlname           : result.urlname,
              join_mode         : result.join_mode,
              who               : result.who,
              coordinates       : {
                latitude        : result.lat,
                longitude       : result.lon
              }
            }))
            .then(function(created) {
              logger.info("Created new Meetup group called " + created.name + "!");
              req.flash("success", "Meetup group " + created.name + " added!");
              res.redirect('/meetups');
            }, tossback(next)).fail(tossback(next));

          } else {
            // Update the Meetup group
            meetup.name      = result.name;
            meetup.urlname   = result.urlname;
            meetup.join_mode = result.join_mode;
            meetup.who       = result.who;
            meetup.coordinates.latitude  = result.lat;
            meetup.coordinates.longitude = result.lon;

            Q.ninvoke(meetup, 'save')
              .then(function(saved) {
                logger.info("Updated an existing Meetup group called " + meetup.name + "!");
                req.flash("info", "Meetup group \"" + meetup.name + "\" updated!");
                res.redirect('/meetups');
              }, tossback(next))
              .fail(tossback(next));
          }

        }, tossback(next)).fail(tossback(next));

    }, tossback(next)).fail(tossback(next));

};
