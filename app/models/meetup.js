/**
 *  app/models/meetup.js
 *  Meetup model for storing information about meetups
 *
 *  Author:   Benjamin Bengfort <benb@datacommunitydc.org>
 *  Created:  Sun Jul 13 12:24:21 2014 -0400
 *
 *  Copyright (C) 2014 Data Community DC
 *  For license information, see LICENSE.txt
 *
 *  ID: meetup.js [] benb@datacommunitydc.org $
 */

// JS Hint directives and strict mode
/* globals exports,__filename */
'use strict';

//////////////////////////////////////////////////////////////////////////
// Requires
//////////////////////////////////////////////////////////////////////////

var _ = require('underscore');
var Q = require('q');
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var config   = require('../../config/application');
var meetapi  = require('meetup-api')(config.meetup.apiKey);
var Event    = require('./event');

//////////////////////////////////////////////////////////////////////////
// MeetupSchema
//////////////////////////////////////////////////////////////////////////

var MeetupSchema = new Schema({
  meetup_id         : { type: Number, required: true },
  name              : { type: String, required: true },
  urlname           : { type: String, required: true },
  join_mode         : { type: String, required: false },
  who               : { type: String, required: false },
  coordinates       : {
    latitude        : { type: Number, required: false },
    longitude       : { type: Number, required: false }
  },
  created           : { type: Date, required: true, default: Date.now },
  updated           : { type: Date, required: true, default: Date.now }
});

//////////////////////////////////////////////////////////////////////////
// Plugins
//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
// Indexes
//////////////////////////////////////////////////////////////////////////

MeetupSchema.path('meetup_id').index({unique: true});
MeetupSchema.path('urlname').index({unique: true});

//////////////////////////////////////////////////////////////////////////
// Validation
//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
// Hooks
//////////////////////////////////////////////////////////////////////////

/**
 * Ensure that various dates are updated.
 * Ensure that a password is hashed.
 *
 * @param  {Function} next callback
 * @return {null}
 */
MeetupSchema.pre('save', function(next) {
  var self = this;
  var now  = new Date();
  self.updated = now;

  next();

});

//////////////////////////////////////////////////////////////////////////
// Instance Methods
//////////////////////////////////////////////////////////////////////////

/**
 * Fetches events using the Meetup API for the particular meetup.
 *
 * @return {Promise} A promise for the event fetching.
 * @todo  add a time range for fetching, and other params.
 */
MeetupSchema.methods.fetchEvents = function() {
  var self   = this;
  var params = {
    'group_id': self.meetup_id
  }

  // Fetch events from the meetup-api
  return Q.ninvoke(meetapi, 'getEvents', params)
    .then(function(events) {

      // Construct an array of Event objects
      var e = _.map(events.results, function(edata) {
        return new Event({
          meetup_id         : edata.id,
          name              : edata.name,
          description       : edata.description,
          time              : new Date(edata.time),
          duration          : edata.duration,
          url               : edata.event_url,
          status            : edata.status,
          rsvps             : {
            yes:              edata.yes_rsvp_count,
            maybe:            edata.maybe_rsvp_count,
          },
          venue             : {
            meetup_id       : edata.venue.id,
            name            : edata.venue.name,
            address         : edata.venue.address_1,
            city            : edata.venue.city,
            state           : edata.venue.state,
            zip             : edata.venue.zip,
            coordinates     : {
              latitude      : edata.venue.lat,
              longitude     : edata.venue.lon
            }
          },
          group             : {
            _id             : self._id,
            meetup_id       : edata.group.id,
            name            : edata.group.name,
          }
        });
      });

      // Return the array
      return Q(e);
    });
};

//////////////////////////////////////////////////////////////////////////
// Virtual Properties
//////////////////////////////////////////////////////////////////////////

/**
 * Alias for the urlname (slug)
 *
 * @return {String} the slug (urlname)
 */
MeetupSchema.virtual('slug')
  .get(function() {
    return this.urlname;
  })
  .set(function(value) {
    this.set('urlname', value);
  });

//////////////////////////////////////////////////////////////////////////
// Static Methods
//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
// Return
//////////////////////////////////////////////////////////////////////////

// return the model object, but keep a local reference
var MeetupModel = mongoose.model('Meetup', MeetupSchema);
module.exports = MeetupModel;
