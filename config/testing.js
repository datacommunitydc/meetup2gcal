/**
 *  config/testing.js
 *  Testing configuration.
 *
 *  Author:   Benjamin Bengfort <benb@datacommunitydc.org>
 *  Created:  Mon Jul 07 23:24:22 2014 -0400
 *
 *  Copyright (C) 2014 Data Community DC
 *  For license information, see LICENSE.txt
 *
 *  ID: testing.js [] benb@datacommunitydc.org $
 */

// JS Hint directives and strict mode
/* globals exports,__filename */
'use strict';


//////////////////////////////////////////////////////////////////////////
// Requires and initialization
//////////////////////////////////////////////////////////////////////////

var _ = require('underscore');

//////////////////////////////////////////////////////////////////////////
// Configuration object
//////////////////////////////////////////////////////////////////////////

var configuration = {

  // secret key for sessions
  secret: "supersecretnotsosecrettestingkey",

  // authentication information
  auth: {

    // Google OAuth
    googleAuth: {
      clientID     : "testclientid",
      clientSecret : "testclientsecret",
      callbackURL  : "/auth/test/callback"
    }

  }

};

//////////////////////////////////////////////////////////////////////////
// Exports
//////////////////////////////////////////////////////////////////////////

module.exports = configuration;
