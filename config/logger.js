/**
 *  config/logger.js
 *  Logger configuration for using winston throughout the code.
 *
 *  Author:   Benjamin Bengfort <benb@datacommunitydc.org>
 *  Created:  Mon Jul 07 23:52:36 2014 -0400
 *
 *  Copyright (C) 2014 Data Community DC
 *  For license information, see LICENSE.txt
 *
 *  ID: logger.js [] benb@datacommunitydc.org $
 */

// JS Hint directives and strict mode
/* globals exports,__filename */
'use strict';

//////////////////////////////////////////////////////////////////////////
// Requires
//////////////////////////////////////////////////////////////////////////

var config  = require('./application')
  , winston = require('winston');

// Configure logger colors
winston.config.npm.colors.debug  = 'magenta';
winston.config.npm.levels.access = 6;
winston.config.npm.colors.access = 'cyan';
winston.config.npm.levels.audit  = 7;
winston.config.npm.colors.audit  = 'blue';
winston.setLevels(winston.config.npm.levels);
winston.addColors(winston.config.npm.colors);

// Create a mock function for test environment
function fake() { return true; }

//////////////////////////////////////////////////////////////////////////
// Return a logging object based on environment
//////////////////////////////////////////////////////////////////////////

if (config.environment != 'test') {

  // Re-register console transport
  winston.remove(winston.transports.Console);
  winston.add(winston.transports.Console, {
    colorize: true,
    timestamp: true
  });

  // return the logging object
  module.exports = winston;

} else {

  // Simply return the winston object, lumberjack will handle the mock
  module.exports = winston;

}
