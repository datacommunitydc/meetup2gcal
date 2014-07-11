# meetup2gcal [![Build Status][travis_img]][travis_status] [![Dependencies][david_img]][david_status] #
**A Node/Heroku system for piping Meetup events into a Google Calendar**

[![Meetup Calendar][calendar_img]][calendar_img]

The while of time is spinning, and as a Data Community, we cannot let it slip by, lest we lose ourselves in the flux of time and space. After all, we are not photons who are young eternally. Therefore we have built this project so that we may tame time and in particular our Meetup.com calendars such that they appear on our website on Squarespace via the Google calendar. The chain of dependency is complex, but this software creates the pipes that keep us all where we need to be, when we need to be. 

More details about this site will soon follow, but if you're looking for a trial, find yourself here: [meetup2gcal.herokuapp.com](http://meetup2gcal.herokuapp.com). This is currently the production deployment of the meetup2gcal app.

### Logging in with Google ###

Authentication is provided by Google - please login using your @datacommunitydc.org email addresses (now hosted by Google Apps). If you do not, the system will decide that you are some spectator and not give you much to do on the site. 

## Developer Notes ##

* Store your local development environment in a `.env` file in the root
* Use `make runserver` to execute the dev environment and run the server with automatic reloads on save (using nodemon)
* Use `make test` to execute the test scripts (using mocha)

There are currently three branches of development:

* master
* staging
* integration

The master (production) branch is the only branch that gets pushed to Heroku. The master branch should not be pushed unless it has been tagged with a release number. If you're not @bbengfort or @harlanh then you should probably not be pushing to master. 

The staging branch is where we get our act together and test before we push to production. There is no staging server as of yet, but there might be a light weight one in the future. 

The integration branch is a development branch and is used for merging our various work together in a meaningful way. This is the branch that you probably want to be on if you're working on the code. 

Please feel free to contribute, if you're looking for issues, check out our issue tracker on [https://waffle.io/datacommunitydc/meetup2gcal](https://waffle.io/datacommunitydc/meetup2gcal) - this is a Trello-like interface that integrates with Github issues - issues on waffle.io are issues in Github. Please make sure that you mark the issue in the commits and appropriately assign them to the correct milestones.

Pull requests will be monitored by @bbengfort and @harlanh but if you become an active contributor, we may give you the keys to the app and let you help out as well.  The key to a good pull request is _tests_ -- if you have tests and everything builds ok, there is very little we will say that will make us not accept the request. If you submit something without tests, just expect that we will ignore you. 

Keep in mind that there are release notes and more details on the [wiki](https://github.com/datacommunitydc/meetup2gcal/wiki).

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

**NOTE**: This list is probably out of date as of the last release and needs updating from the `package.json` file.

[travis_img]: https://travis-ci.org/datacommunitydc/meetup2gcal.svg?branch=master
[travis_status]: https://travis-ci.org/datacommunitydc/meetup2gcal
[david_img]: https://david-dm.org/datacommunitydc/meetup2gcal.png
[david_status]: https://david-dm.org/datacommunitydc/meetup2gcal
[calendar_img]: http://fc00.deviantart.net/fs71/f/2010/090/0/5/Calendar_wheel_for_Conky_4_by_wlourf.png
