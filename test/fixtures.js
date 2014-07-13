/**
 *  fixures.js
 *  Load any fixture data into the Mongo database.
 *
 *  Author:   Harlan Harris <harlan@datacommunitydc.org>
 *  Created:  Sun Jul 13 14:04:02 EDT 2014
 *
 *  Copyright (C) 2014 Data Community DC
 *  For license information, see LICENSE.txt
 *
 *  ID: test.js [] harlan@datacommunitydc.org $
 */

// JS Hint directives and strict mode
/* globals exports,__filename */
'use strict';

// Async finish command
function finish(err) {
  if (err) {
    console.log('An error occurred!', err);
    process.exit(1);
  } else {
    process.exit(0);
  }
}

module.exports = function() {

  // Initialize local variables
  var mongoose = require('mongoose')
    , config   = require('../config/application')
    , fs = require('fs')
    , _  = require('underscore')
    , Q  = require('q')
    , logger = require('../app/utils/lumberjack');

  _.str  = require('underscore.string');

  // Initialize the connection to the database
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback() {
      logger.info('Connected to the database at %s', config.database.connection);
  });
  mongoose.connect(config.database.connection);

  // Load the models that are required
  var Meetup = require('../app/models/meetup');

  // push meetup fixtures into the database
  var meetups = require('./fixtures/meetups.json');
  Q.all(_.map(meetups, function(mu) {
  	return Q(Meetup.create(mu));
  }))
  .then(function(results) {
  	console.log(results);
  	finish();
  });


}