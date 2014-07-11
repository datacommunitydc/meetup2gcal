/**
 *  config/routes.js
 *  Definition of routes for the meetup2gcal app
 *  This route file explicitly sets every single route in the application
 *  prefering to be very verbose about each and every route. Larger apps
 *  may use express.Router to functionalies various routes, but in order
 *  to keep meetup2gcal lightweight, this mechanism is used instead.
 *
 *  Author:   Benjamin Bengfort <benb@datacommunitydc.org>
 *  Created:  Thu Jul 10 20:39:10 2014 -0400
 *
 *  Copyright (C) 2014 Data Community DC
 *  For license information, see LICENSE.txt
 *
 *  ID: routes.js [] benb@datacommunitydc.org $
 */

// JS Hint directives and strict mode
/* globals exports,__filename */
'use strict';

//////////////////////////////////////////////////////////////////////////
// Configuration Function (exported)
//////////////////////////////////////////////////////////////////////////

module.exports = function(app) {

  var passport = require('passport');

  /**
   * Finds and returns the correct route handler based on the supplied
   * controller, method name, and version
   *
   * @param  {String} controller the module to look in
   * @param  {String} action     the method name to use as a handler
   * @param  {String} version    the version of the controller
   * @return {Function}          the function that is the route handler
   */
  function register(controller, action, version) {
    // Construct require path
    var path = '../app/controllers/' + controller;
    if (version) path += '/' + version;

    // Requre the controller and return the action
    var lib = require(path);
    return lib[action];
  }

  /**
   * Middleware that ensures the endpoint is authenticated before routing.
   * @param  {Request}    req  the request being handled
   * @param  {Response}   res  the current response
   * @param  {Function}   next callback to skip other middleware
   * @return {null}
   */
  function authenticate(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/');
  }

  ////////////////////////////////////////////////////////////////////////
  // INDEX ROUTES
  ////////////////////////////////////////////////////////////////////////

  app.get('/', register('index', 'index'));

  app.get('/alive', register('index', 'alive'));

  ////////////////////////////////////////////////////////////////////////
  // AUTHENTICATION ROUTES
  ////////////////////////////////////////////////////////////////////////

  app.get('/profile', authenticate, register('auth', 'profile'));

  app.get('/auth/logout', register('auth', 'logout'));

  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email']}));

  app.get('/auth/google/callback', passport.authenticate('google', { successRedirect : '/profile', failureRedirect : '/'}));

  ////////////////////////////////////////////////////////////////////////
  // USERS ROUTES
  ////////////////////////////////////////////////////////////////////////

  app.get('/users', authenticate, register('users', 'list'));

};
