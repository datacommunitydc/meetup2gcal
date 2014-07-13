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
  }
  venue             : {
    _id             : { type: Schema.ObjectId, auto: true },
    meetup_id       : { type: String, required: false },
    name            : { type: String, required: false },
    address         : { type: String, required: false },
    city:           : { type: String, required: false },
    state:          : { type: String, required: false },
    zip             : { type: String, required: false },
    coordinates     : {
      latitude      : { type: Number, required: false },
      longitude     : { type: Number, required: false }
    }
  },
  group             : {
    _id             : { type: Schema.ObjectId, auto: true },
    meetup_id       : { type: String, required: false },
    name            : { type: String, required: false }
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

//////////////////////////////////////////////////////////////////////////
// Virtual Properties
//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
// Static Methods
//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
// Return
//////////////////////////////////////////////////////////////////////////

// return the model object, but keep a local reference
var EventModel = mongoose.model('Event', EventSchema);
module.exports = EventModel;
