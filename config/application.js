/**
 *  config/application.js
 *  Application level configuration for the application that is environment
 *  dependent. This file is responsible for loading configuration info from
 *  the environment.
 *
 *  Note: When running tests, this file should not load any configuration
 *    from a .env file but rather take all configuration from command line
 *    or environmental variables.
 *
 *  Author:   Benjamin Bengfort <benb@datacommunitydc.org>
 *  Created:  Mon Jul 07 23:24:22 2014 -0400
 *
 *  Copyright (C) 2014 Data Community DC
 *  For license information, see LICENSE.txt
 *
 *  ID: application.js [] benb@datacommunitydc.org $
 */

// JS Hint directives and strict mode
/* globals exports,__filename */
'use strict';


//////////////////////////////////////////////////////////////////////////
// Requires and initialization
//////////////////////////////////////////////////////////////////////////

var _ = require('underscore');

// Load environmental variables from .env file if not testing
if (process.env.NODE_ENV != 'test') {
  var dotenv = require('dotenv');
  dotenv.load();
}

//////////////////////////////////////////////////////////////////////////
// Configuration object
//////////////////////////////////////////////////////////////////////////

var configuration = {

  // runtime environment
  environment: process.env.NODE_ENV,

  // secret key for sessions
  secret: process.env.SECRET_KEY,

  // port to respond on
  port: process.env.PORT,

  // database connection information
  database: {
    connection: process.env.DATABASE_CONNECTION,
    database: _.last(process.env.DATABASE_CONNECTION.split('/')),
    hostname: _.first(_.last(process.env.DATABASE_CONNECTION.split('//')).split('/'))
  },

  meetup: {
    apiKey: process.env.MEETUP_API_KEY
  },

  // authentication information
  auth: {

    // Google OAuth
    googleAuth: {
      clientID     : process.env.GOOGLE_AUTH_CLIENT_ID,
      clientSecret : process.env.GOOGLE_AUTH_SECRET,
      callbackURL  : process.env.GOOGLE_AUTH_CALLBACK
    }

  }

};

//////////////////////////////////////////////////////////////////////////
// Testing configuration
//////////////////////////////////////////////////////////////////////////

// Update with test configuration
if (process.env.NODE_ENV === 'test') {
  var testConfig = require('./testing');
  _.extend(configuration, testConfig);
}

//////////////////////////////////////////////////////////////////////////
// Exports
//////////////////////////////////////////////////////////////////////////

module.exports = configuration;
