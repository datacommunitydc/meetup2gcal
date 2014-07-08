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
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./config/application');
var logger = require('./config/logger');
var routes = require('./routes/index');
var users  = require('./routes/users');

var app = express();

//////////////////////////////////////////////////////////////////////////
// App configuration
//////////////////////////////////////////////////////////////////////////

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//////////////////////////////////////////////////////////////////////////
// Load middleware
//////////////////////////////////////////////////////////////////////////

app.use(favicon());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

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

//////////////////////////////////////////////////////////////////////////
// Logger handler
//////////////////////////////////////////////////////////////////////////

app.use(function(err, req, res, next) {
    function logRequest() {

        res.removeListener('finish', logRequest);
        res.removeListener('close', logRequest);
        try {
            var now = new Date();
            var rlf = 'Served %(method)s %(path)s request %(statusCode)d in %(elapsed)dms';

            var data = {
              method: req.method.toUpperCase(),
              path: req.path(),
              statusCode: res.statusCode,
              elapsed: now.getTime() - req._time,
              error: error
            };

            logger.info(_.str.sprintf(rlf, data), data);
        } catch (e) {
            logger.error('Could not log request', {error: e.toString()});
        }
    };

    res.on('finish', logRequest);
    res.on('close', logRequest);

    next();
});

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
