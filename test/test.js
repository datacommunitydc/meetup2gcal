/**
 *  test.js
 *  Responsible for the configuration/initialization and execution of the
 *  test runner and suits for both unit and integration testing.
 *
 *  Author:   Benjamin Bengfort <benb@datacommunitydc.org>
 *  Created:  Mon Jul 07 22:53:39 2014 -0400
 *
 *  Copyright (C) 2014 Data Community DC
 *  For license information, see LICENSE.txt
 *
 *  ID: test.js [] benb@datacommunitydc.org $
 */

// JS Hint directives and strict mode
/* globals exports,__filename */
'use strict';

//////////////////////////////////////////////////////////////////////////
// Setup
//////////////////////////////////////////////////////////////////////////

// Load APP and create convenience variables
var app = require('../app');

var config = require('../config/application');
// var logger = require('../lib/logger');

// Print configuration for test debugging
console.log('');
console.log('Starting meetup2gcal test suite');
console.log('');
console.log('    Current Configuration:');
console.log('        1) environment is \'%s\'', app.get('env'));
console.log('        2) test database is \'%s\'', config.database.connection);

// start server and save url for tests
var server = app.listen(config.port);
var addr   = server.address()
console.log('        3) test server is %s:%d', addr.address, addr.port);

//////////////////////////////////////////////////////////////////////////
// Load unit tests
//////////////////////////////////////////////////////////////////////////

require('./unit/user')();
require('./unit/lumberjack')();
require('./unit/meetup')();
require('./unit/event')();

//////////////////////////////////////////////////////////////////////////
// Load integration tests
//////////////////////////////////////////////////////////////////////////

require('./integration/index')();
require('./integration/auth')();
require('./integration/users')();
require('./integration/msync')();
require('./integration/meetups')();
