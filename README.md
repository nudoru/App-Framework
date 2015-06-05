# NORI App Framework

Handy starting template for my JS projects based on some of the ideas of: AS3 Robotlegs, Backbone, Ember + other random ideas I've found and liked. Based on the MVC pattern.

Dependencies: RxJS, GSAP TweenLite, Lowdash and my Nudoru utility classes.

## To create new application

**Keep in mind**

- Update the grunt file as needed.
- I've created my own define/require module thing based on CommonJS. All require statements refer to that. See below.

The `config.js` file contains a global configuration JSON object. Nori wraps it and exposed it via: `Nori.getConfig().appConfig`

Create an `app.js` file and put the following in the `window.onload` handler:

### In here you need to create the global application instance:
```javascript
window.MyApp = Nori.create();
```

### You need to create a module for the main view and make the object:
```javascript
var appView = Nori.extend(require('myviewmodule.id'), require('Nori.View'));
```

### Initialize the application with the view. 

This is required so that routes can be properly mapped
```javascript
MyApp.initialize({view:appView});
```

### Map events to command modules. 

Commands are controllers that are triggered when an event is emitted. Sample:
```javascript
MyApp.mapEventCommand(_appEvents.ROUTE_CHANGED, ‘MyApp.RouteChangedCommand’);
```

### Map routes to view modules. 

The Router module monitors the URL hash for changes and will instruct the view to load the HTML template id [‘template__whateverID’] with the subview module. Sample:
```javascript
MyApp.mapRouteView(‘/route’, ‘whateverID’, ‘MyApp.view.whaterverIDview’);
```

### Define models, load data, etc.

### Clear the loading message which display while all of this happens
```javascript
MyApp.view().removeLoadingMessage();
```

### Execute the current URL route
```javascript
MyApp.setCurrentRoute(MyApp.router().getCurrentRoute()); 
```

### Profit!

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

## Emitted events

The `scripts/nori/events/Emitter.js` is a pub/sub system that uses RxJS subjects. You can subscribe to events with it and publish events.

Subscribing to an event returns a RxJS subscription.

Events are ‘magic’ strings. Nori defines core application ones in the `scripts/events/AppEvents.js` and `scripts/nudoru/browser/BrowserEvents.js` modules.

## Commands

Controller functionality is handled by command classes. The `execute(data)` function is executed when the mapped event is published and any data included in the publish is passed as an object in the data argument.

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

**Todo - document model collection**

### Binding sub views to model changes

You can map a sub view to a model and it will receive the updated model store when a change occurs:

```javascript
MyApp.bindModelView(‘modelID’,’viewID’);
```

# Nudoru Components / Utils

Collection of utility and helper classes.

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