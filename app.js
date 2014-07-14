/**
 *  app.js
 *  Responsible for the initialization of the web app.
 *
 *  Author:   Benjamin Bengfort <benb@datacommunitydc.org>
 *  Created:  Mon Jul 07 23:18:39 2014 -0400
 *
 *  Copyright (C) 2014 Data Community DC
 *  For license information, see LICENSE.txt
 *
 *  ID: app.js [] benb@datacommunitydc.org $
 */

// JS Hint directives and strict mode
/* globals exports,__filename */
'use strict';

//////////////////////////////////////////////////////////////////////////
// Initialize local variables
//////////////////////////////////////////////////////////////////////////

var _ = require('underscore');
_.str = require('underscore.string');

var express  = require('express');
var path     = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var session  = require('express-session');
var flash    = require('connect-flash');
var config   = require('./config/application');
var logger   = require('./app/utils/lumberjack');
var meetup   = require('meetup-api')(config.meetup.apiKey);

var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');

//////////////////////////////////////////////////////////////////////////
// Construct the application
//////////////////////////////////////////////////////////////////////////

var app = express();

//////////////////////////////////////////////////////////////////////////
// App configuration
//////////////////////////////////////////////////////////////////////////

// configure new relic
if (config.environment === 'production') require('newrelic');

// view engine setup
app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'jade');

// configure passport
require('./config/passport')(passport);

// configure locals
app.locals.moment = require('moment');

//////////////////////////////////////////////////////////////////////////
// Load middleware
//////////////////////////////////////////////////////////////////////////

app.use(logger.responseTime());
app.use(logger.response());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// passport middleware
app.use(session({ secret: config.secret, saveUninitialized: true, resave: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//////////////////////////////////////////////////////////////////////////
// Load Routes
//////////////////////////////////////////////////////////////////////////

require('./config/routes')(app);

//////////////////////////////////////////////////////////////////////////
// Database Connection
//////////////////////////////////////////////////////////////////////////

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    logger.info('Connected to the database at %s', config.database.connection);
});
mongoose.connect(config.database.connection);

//////////////////////////////////////////////////////////////////////////
// Load Models
//////////////////////////////////////////////////////////////////////////

var User   = require('./app/models/user');
var Meetup = require('./app/models/meetup');
var Event  = require('./app/models/event');

//////////////////////////////////////////////////////////////////////////
// Logger handler
//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
// Error handlers
//////////////////////////////////////////////////////////////////////////

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//////////////////////////////////////////////////////////////////////////
// Exports
//////////////////////////////////////////////////////////////////////////

module.exports = app;
