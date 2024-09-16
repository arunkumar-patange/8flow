# make build
# make start

SHELL := /bin/bash
HIDE ?= @
DOCKER_IMAGE ?= 8flow/cupcakes
DOCKER_CONTAINER ?= cupcakes
VOLUME ?= -v $(PWD):/8flow/src -v $(DOCKER_CONTAINER)-modules:/8flow/src/node_modules
ENV ?= --env-file=./docker/dev-env.rc
ENVIRONMENT ?= development
NETWORK ?= --network=8flow

-include ./docker/help.mk

.PHONY: build test lint mongo


## builds the image
build:
	$(HIDE)docker build -f Dockerfile -t $(DOCKER_IMAGE) $(PWD)
	$(HIDE)$(MAKE) install

install:
	$(HIDE)docker run -it --rm $(VOLUME) $(DOCKER_IMAGE) npm i

## start the service in docker container
start: network mongo
	$(HIDE)docker run --rm -it --name $(DOCKER_CONTAINER) \
		$(VOLUME) \
		$(ENV) \
		$(NETWORK) \
		-p 3000:3000 \
		$(DOCKER_IMAGE) npm run dev

## run tests
test: network mongo
	$(HIDE)docker run -it --rm $(VOLUME) $(ENV) -e NODE_ENV=test $(NETWORK) $(DOCKER_IMAGE) npm run test

## run tests
lint:
	$(HIDE)docker run -it --rm $(VOLUME) $(DOCKER_IMAGE) npm run lint


## get into node repl
start.repl:
	$(HIDE)docker exec -it $(DOCKER_CONTAINER) sh -c '/8flow/src/node_modules/.bin/ts-node'

# enter the container
enter:
	$(HIDE)docker exec -it $(DOCKER_CONTAINER) /bin/bash

enter.%:
	$(HIDE)docker exec -it $* sh

network:
	-$(HIDE)docker network create --attachable -d bridge 8flow > /dev/null 2>&1 || true

## start mongo container
mongo: network
	-$(HIDE)docker run -d $(NETWORK) $(ENV) --name=mongo -v $(DOCKER_CONTAINER)-mongo:/data/db mongo@sha256:1ade6afda762cb6a68ba65e83ef305660ef0517d6d4140627211970e85f4588a

mongo-express:
	-$(HIDE)docker run -d $(NETWORK) $(ENV) -p 8081:8081 mongo-express@sha256:1b23d7976f0210dbec74045c209e52fbb26d29b2e873d6c6fa3d3f0ae32c2a64
