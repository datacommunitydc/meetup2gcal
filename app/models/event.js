/**
 *  app/models/event.js
 *  Event model for storing information about events
 *
 *  Author:   Benjamin Bengfort <benb@datacommunitydc.org>
 *  Created:  Sun Jul 13 12:26:58 2014 -0400
 *
 *  Copyright (C) 2014 Data Community DC
 *  For license information, see LICENSE.txt
 *
 *  ID: event.js [] benb@datacommunitydc.org $
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

//////////////////////////////////////////////////////////////////////////
// EventSchema
//////////////////////////////////////////////////////////////////////////

var EventSchema = new Schema({
  meetup_id         : { type: String, required: false },
  name              : { type: String, required: true },
  description       : { type: String, required: false },
  time              : { type: Date, required: true },
  duration          : { type: Number, required: false },
  url               : { type: String, required: false },
  status            : { type: String, required: false, default: null },
  rsvps             : {
    yes:              { type: Number, required: false },
    no:               { type: Number, required: false },
    maybe:            { type: Number, required: false },
    pending:          { type: Number, required: false }
  },
  venue             : {
    _id             : { type: Schema.ObjectId, auto: true },
    meetup_id       : { type: String, required: false },
    name            : { type: String, required: false },
    address         : { type: String, required: false },
    city            : { type: String, required: false },
    state           : { type: String, required: false },
    zip             : { type: String, required: false },
    coordinates     : {
      latitude      : { type: Number, required: false },
      longitude     : { type: Number, required: false }
    }
  },
  group             : {
    _id             : { type: Schema.ObjectId, ref: 'Meetup' },
    meetup_id       : { type: Number, required: false },
    name            : { type: String, required: false },
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

EventSchema.path('meetup_id').index({unique: true});

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
EventSchema.pre('save', function(next) {
  var self = this;
  var now  = new Date();
  self.updated = now;

  next();

});

//////////////////////////////////////////////////////////////////////////
// Instance Methods
//////////////////////////////////////////////////////////////////////////

/**
 * Use the Google OAuth with JWT to sync this event to the Google Calendar
 *
 * @return {Promise} A promise for the sync to Google.
 */
EventSchema.methods.syncGoogleCalendar = function() {
  // TODO: Harlan write here!
};

//////////////////////////////////////////////////////////////////////////
// Virtual Properties
//////////////////////////////////////////////////////////////////////////

/**
 * Alias for the 'time' property to more specifically say when the start
 * time is - for things like Google calendar, and to match the end virtual.
 */
EventSchema.virtual('start')
  .get(function() { return this.time; })
  .set(function(value) { this.set('time', value); });

/**
 * Computes the end time based on the start time and the duration of the
 * event (which is how we get this data back from Meetup.com).
 *
 * @todo add setter that will modify the duration property.
 */
EventSchema.virtual('end')
  .get(function() {
    return new Date(this.time + (this.duration || 1000*60*60*2));
  })
  .set(function(val) {
    throw new Error("The setter is currently not implemented");
  });

//////////////////////////////////////////////////////////////////////////
// Static Methods
//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
// Return
//////////////////////////////////////////////////////////////////////////

// return the model object, but keep a local reference
var EventModel = mongoose.model('Event', EventSchema);
module.exports = EventModel;
