# Shell to use with Make
SHELL := /bin/sh

# Set important paths and environment
REPORTER := dot
NODE_ENV := test
DEFAULT_DB_CONNECTION := mongodb://localhost/meetup2gcal-test
SERVER_PORT           := 4445

# Export targets not associated with files
.PHONY: test nodemon clean bootstrap runserver

# Target for Node Testing
test:
	@NODE_ENV=test DEFAULT_DB_CONNECTION=$(DEFAULT_DB_CONNECTION) PORT=$(SERVER_PORT) ./node_modules/.bin/mocha --reporter $(REPORTER) -R spec

# Target for running the server
runserver:
	- source ./.env
	- nodemon ./bin/www
