# App Framework

Handy starting template for my JS projects

All scripts are in source/scripts General dependencies: RxJS, GSAP TweenLite and Underscore (for template engine)

# Nudoru Components / Utils

## nudoru/components

A few view modules

## nudoru/events

EventDispatcher and EventCommandMap enable event driven functionality. Simple pub/sub system that can drive a command based controller.

+ A few core/common event "magic string" modules.

## nudoru/utils

Various utility classes. And these

- BrowserInfo, information on the current browser
- NLorem, Lorem Ipsum dummy text generator
- NTemplate, HTML templating system that uses Underscore
- Router, enables view routing from URL hash fragments

# App

- config.js, externalized configuration vars
- main.js, Application entry point

app/App.js
Application name space and entry point.

## Controller

### Commands

### Events

#### Event Command Map

## Model

### Model Value Objects

## View

### Router