## —— Base configurations 📚 ————————————————————————————————————————————————————————————————

.DEFAULT_GOAL = help

CI ?= 0
STAGE ?= dev
IMAGE_TAG ?= dev
LOCAL_USER := $$(whoami)

INTERACTIVE ?= $(shell test -t 0 && test "${CI:-}" != "true" && echo 1)

UID := $(shell id -u)
PWD := $(shell pwd)

.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

## —— Development commands 🚀 ————————————————————————————————————————————————————————————————

.PHONY: dev-ios ## Run iOS development environment
dev-ios:
	npx expo start --ios

.PHONY: dev-android ## Run Android development environment
dev-android:
	npx expo start --android
