# meetup2gcal [![Build Status][travis_img]][travis_status] #
**A Node/Heroku system for piping Meetup events into a Google Calendar**

[![Meetup Calendar][calendar_img]][calendar_img]

TODO: More README

## Developer Notes ##

* Store your local development environment in a `.env` file in the root
* Use `make runserver` to execute the dev environment and run the server with automatic reloads on save (using nodemon)
* Use `make test` to execute the test scripts (using mocha)

## Technology ##

meetup2gcal needs a better name, but is written in Node.js (Javascript). Useful pacakges include the following:

* express -- web services
* jade -- web page templating
* mongodb -- nosql database library
* mongoose -- object document mapper
* winston -- logging
* q -- an excellent promise library
* dotenv -- manages development environment
* underscore -- because you need to do things
* chai -- for writing good tests
* mocha -- for executing tests
* sinon -- for creating fixtures for tests

[travis_img]: https://travis-ci.org/datacommunitydc/meetup2gcal.svg?branch=master
[travis_status]: https://travis-ci.org/datacommunitydc/meetup2gcal
[calendar_img]: http://adespresso.com/wp-content/uploads/2014/01/days-of-week.jpg
