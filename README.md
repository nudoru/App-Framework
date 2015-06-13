# NORI App Framework

[![Build Status](https://travis-ci.org/nudoru/App-Framework.svg?branch=master)](https://travis-ci.org/nudoru/App-Framework)

Handy starting template for my JS projects based on some of the ideas of: ~~AS3 Robotlegs, Backbone, Ember + other random ideas I've found and liked. Based on the MVC pattern.~~ Flux and Command-Query Responsibility Segregation (CQRS) generally after reading this great post: http://jaysoo.ca/2015/02/06/what-the-flux/

Dependencies: RxJS, GSAP TweenLite, Lowdash and my Nudoru utility classes.

## To create new application

**NEED TO UPDATE THIS SECTION**

**Keep in mind**

- Update the grunt file as needed.
- I've created my own define/require module thing based on CommonJS. All require statements refer to that. See below.

The `config.js` file contains a global configuration JSON object. Nori wraps it and exposed it via: `Nori.getConfig().appConfig`

Create an `app.js` file and put the following in the `window.onload` handler:

### 1. In here you need to create the global application instance:
```javascript
window.MyApp = Nori.create();
```

### 2. You need to create a module for the main view and make the object:
```javascript
var appView = MyApp.createApplicationView(require('MyAppViewModuleID'));
```

### 3. Initialize the application with the view. 

This is required so that routes can be properly mapped
```javascript
MyApp.initialize({view:appView});
```

### 4. Map events to handlers or commands. 

```javascript
_dispatcher.subscribe(_appEventConstants.UPDATE_MODEL_DATA, function execute(data) {
  console.log('Update model data, model id: ',data.id, data.data);
});
```

Commands are controllers that are triggered when an event is emitted. Sample:
```javascript
MyApp.mapEventCommand(_appEventConstants.ROUTE_CHANGED, ‘MyApp.RouteChangedCommand’);
```

### 5. Map routes to view modules. 

The Router module monitors the URL hash for changes and will instruct the view to load the HTML template id [‘template__whateverID’] with the subview module. Sample:
```javascript
MyApp.mapRouteView(‘/route’, ‘whateverID’, ‘MyApp.view.whaterverIDview’);
```

### 6. Define models, load data, etc.

### 7. Clear the loading message which display while all of this happens
```javascript
MyApp.view().removeLoadingMessage();
```

### 8. Execute the current URL route
```javascript
MyApp.setCurrentRoute(MyApp.router().getCurrentRoute()); 
```

## Define / Require

This is in the `source/nudoru/require.js` file

I created my own define/require module system that works without the need to for a build process packager. Modules are based on the CommonJS format.

**Everything in Nori is a module** except for the main Nori object.

### Define a module:
```javascript
define(‘MyApp.Module’,
  function (require, module, exports) {
		exports.method = function() { … };
  });
```

### Require a module:

**Get a singleton instance**
```javascript
var module = require(‘MyApp.Module’);
```

**Get a unique instance**
```javascript
var module = requireUnique(‘MyApp.Module’);
```

## Dispatcher / Events

The `scripts/nori/events/Dispatcher.js` is a pub/sub system that uses RxJS subjects. You can subscribe to events with it and publish events.

Subscribing to an event returns a RxJS subscription.

Events are ‘magic’ strings. Nori defines core application ones in the `scripts/events/AppEvents.js` and `scripts/nudoru/browser/BrowserEvents.js` modules.

Example:
```javascript
_dispatcher.subscribe(_appEventConstants.UPDATE_MODEL_DATA, function execute(data) {
  console.log('Update model data, model id: ',data.id, data.data);
});
```

Events are published and passed a payload object containing the event name type, and an optional payload object

```javascript
_dispatcher.publish({
  type: _appEventConstants.MODEL_DATA_CHANGED,
  payload: {
    id: _id,
    storeType: 'model',
    store: getStore(),
    changed: _lastChangeResult
  }
});
```

## Commands

Controller functionality may be handled by command classes. The `execute(data)` function is executed when the mapped event is published and any data included in the publish is passed as an object in the data argument.

Nori maps the following events to commands as part of the framework:

```javascript
// Model
mapEventCommand(AppEvents.MODEL_DATA_CHANGED, ‘Nori.ModelDataChangedCommand’);
mapEventCommand(AppEvents.UPDATE_MODEL_DATA, ‘Nori.UpdateModelDataCommand’);

// Subviews
mapEventCommand(BrowserEvents.URL_HASH_CHANGED, ‘Nori.URLHashChangedCommand’);
mapEventCommand(AppEvents.CHANGE_ROUTE, ‘Nori.ChangeRouteCommand’);
mapEventCommand(AppEvents.SUBVIEW_STORE_STATE, ‘Nori.SubViewStoreDataCommand’);
```

## Models

Nori defines a simple model and model collection class. The model is based on a dictionary and a collection is an array of model objects. Simple example: a model is a spread sheet row with coloumns being data values and a collection would represent the whole sheet. An `id` is required when creating a model or collection.

The Nori app contains helper methods to create models and collections:

```javascript
var myModel = MyApp.createModel({id:'mymodel', store:{key:value, key:value}, {
    optionalMethods: function() { ... };
  });
  
var myCollection = MyApp.createModelCollection({id:'mycollection', {
    optionalMethods: function() { ... };
  });
```

If silent is indicated then changes via `set` will not dispatch a `AppEvents.MODEL_DATA_CHANGED` event.

Model collections will dispatch this event when one of their member models is changed unless `{silent:true}` is specified on the set method.

### SubView -> Model data

The view will call `MyApp.registerForModelChanges(modelID, viewID)` to bind it to any updates on the model. When data is updated on the model or collection the `handleModelUpdate` will run triggering the `update()` method in any bound views.

Data flow:

```
                              ┌──── registerForModelChanges ◀──────────────────┐
         set action           │                                                │
              │               │  ┌──────────────────────────┐                  │
              ▼               │  │     Router URL/Query     │──┐ ┌───────────────────────────┐
┌───────────────────────────┐ │  ├──────────────────────────┤  │ │   User Information View   │
│  User Information Store   │ │  │         NORI APP         │  │ ├───────────────────────────┤
└───────────────────────────┘ │  ├──────────────────────────┤┌─┼▶│          Update           │
              │               └─▶│     Model / View Map     ││ │ └───────────────────────────┘
              │                  └──────────────────────────┘│ │               │
              ▼                                │             │ │               ▼
   ModelDataChanged Event                      │             │ │
              │                                ▼             │ │   Render (will poll for any
              └─────────────────────▶  handleModelUpdate  ───┘ └──▶   query string data)
```

# Nudoru Components / Utils

Collection of utility and helper classes.

## nudoru/core

Utilities for working with data types

## nudoru/browser

Utilities for working on with a browser, DOM, etc.

## nudoru/components

UI Components for web apps