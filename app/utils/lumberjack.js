/**
 *  app/utils/lumberjack.js
 *  Wraps the winston logger to provide added functionality. Use in place
 *  of Winston where this functionality is required- but you can also use
 *  this as normal if required.
 *
 *  There are four distinct types of logs that we use, along with their
 *  associated log levels, listed below:
 *
 *  - ACCESS (access): Apache/Nginx common access log
 *  - ERROR  (error):  For application errors in error or fail callbacks
 *  - EVENT  (info):   Records various events and related data
 *  - WARN   (warn):   Signals changes in application state to the log
 *  - DEBUG  (debug):  For recording debugging information
 *
 *  The log levels associated with their terms are as follows:
 *
 *  0: silly
 *  1: debug
 *  2: verbose
 *  3: info
 *  4: warn
 *  5: error
 *  6: audit
 *
 *  You must pass a JSON data object for consistent logging as follows:
 *
 *  logger.error('some useful message', {
 *    event:  event_type,
 *    source: source_type,
 *    error:  error_object,
 *    data:   { ... }
 *  });
 *
 *  You can also use individual methods and only pass in data objects:
 *
 *  lumberjack.common(request);
 *
 *  Author:   Benjamin Bengfort <ben@cobrain.com>
 *  Created:  Thu Jun 19 13:46:30 2014 -0400
 *
 *  Copyright (C) 2014 Cobrain Company
 *  For license information, see LICENSE.txt
 *
 *  ID: lumberjack.js [] ben@cobrain.com $
 */

// JS Hint directives and strict mode
/* globals exports,__filename */
'use strict';

//////////////////////////////////////////////////////////////////////////
// Include requirements for this module
//////////////////////////////////////////////////////////////////////////

var _            = require('underscore');
_.str            = require('underscore.string');
var winston      = require('../../config/logger');
var config       = require('../../config/application');
var moment       = require('moment');
var prettyHrtime = require('pretty-hrtime')

//////////////////////////////////////////////////////////////////////////
// The Lumberjack Object
//////////////////////////////////////////////////////////////////////////

var Lumberjack = new function() {

  // Extend Lumberjack with winston logging methods
  winston.extend(this);

  this.responseTime = function() {
    return function(req, res, next) {

      if (res._time) return next();
      res._time = new Date;

      next();
    };
  };

  /**
   * Performs Common Log format logging
   *
   * @param  {Request}  req the request object that is being parsed
   * @param  {Response} res response object to formulate common log
   * @return {null}
   *
   * @note this function is currently not functiontion with express
   */
  this.common   = function(req, res) {

    var now  = new Date();
    var cdf  = 'DD/MMM/YYYY:HH:mm:ss ZZ';
    var clf  = '%(host)s %(ident)s %(authuser)s [%(date)s] "%(method)s %(path)s %(http_version)s" %(status)d %(bytes)d';
    var ip   = req.headers['x-forwarded-for'] || req.connection.remoteAddress ||  req.socket.remoteAddress || req.connection.socket.remoteAddress;
    var user = (req.user) ? req.user.username : 'anonymous';

    var data = {
      host: req.host,
      ident: ip,
      authuser: user,
      date: moment().format(cdf),
      method: req.method.toUpperCase(),
      path: req.url,
      http_version: 'HTTP/' + req.httpVersion,
      status: res.statusCode,
      bytes: Buffer.byteLength(res._data, 'utf-8'),
      elapsed: now - res._time
    }

    this.access(_.str.sprintf(clf, data), data);
  };

  /**
   * Performs response time audit logging
   *
   * @param  {Request}  req   the request object
   * @param  {Response} res   the response from node
   * @param  {Error}    error any errors thrown
   * @return {null}
   */
  this.response = function() {
    var self = this;
    return function(req, res, next) {

      res.on('finish', function() {
        var now = new Date();
        var rlf = 'Served %(method)s %(path)s request %(statusCode)d in %(elapsed)dms';

        var data = {
          method: req.method.toUpperCase(),
          path: req.path,
          statusCode: res.statusCode,
          elapsed: now - res._time,
        };

        self.audit(_.str.sprintf(rlf, data), data);
      });

      next();
    };
  };

};

//////////////////////////////////////////////////////////////////////////
// Module Exports
//////////////////////////////////////////////////////////////////////////

if (config.environment == 'test') {

  // empty function, returns true
  Lumberjack.fake    = function() { return true; };

  // mock logging functions
  Lumberjack.silly   = Lumberjack.fake;
  Lumberjack.debug   = Lumberjack.fake;
  Lumberjack.verbose = Lumberjack.fake;
  Lumberjack.info    = Lumberjack.fake;
  Lumberjack.warn    = Lumberjack.fake;
  Lumberjack.error   = Lumberjack.fake;
  Lumberjack.access  = Lumberjack.fake;

}

// Return the logging object
module.exports = Lumberjack;
