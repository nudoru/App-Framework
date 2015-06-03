# NORI App Framework

Handy starting template for my JS projects based on some of the ideas of: AS3 Robotlegs, Backbone, Ember + other random ideas I've found and liked.

Dependencies: RxJS, GSAP TweenLite and Lowdash

## To create new application

**Keep in mind***

- Update the grunt file as needed.
- I've created my own define/require module thing based on CommonJS. All require statements refer to that. See below.

The config.js file contains a global configuration JSON object. Nori wraps it and exposed it via: Nori.getConfig().appConfig

1. Create Make an app.js file

2. In here you need to create the global application instance:
window.MyApp = Nori.create();

3. You need to create a module for the main view ... [steps later] ... and make the object:
var appView = Nori.extend(require('myviewmodule.id'), require('Nori.View'));

4. Initialize the application with the view. This is required so that routes can be properly mapped
MyApp.initialize({view:appView});

5. Map events to command modules. Commands are controllers that are triggered when an event is emitted. Sample:
MyApp.mapEventCommand(_appEvents.ROUTE_CHANGED, ‘TT.RouteChangedCommand’);

6. Map routes to view modules. The Router module monitors the URL hash for changes and will instruct the view to load the HTML template id [‘template__whateverID’] with the subview module. Sample:
MyApp.mapRouteView(‘/route’, ‘whateverID’, ‘MyApp.view.whaterverIDview’);

7. Define models, load data, etc.

8. Clear the loading message that display while all of this happens
MyApp.view().removeLoadingMessage();

9. Execute the current URL route
MyApp.setCurrentRoute(MyApp.router().getCurrentRoute()); 

10. Profit!

## Define / Require

This is in the source/nudoru/require.js file

I created my own define/require module system that works without the need to for a build process packager. Modules are based on the CommonJS format.

**Everything in Nori is a module** except for the main Nori object.

1. Define a module:

define(‘MyApp.Module’,
  function (require, module, exports) {
		exports.method = function() { … };
  });

2. Require a module:

**Get a singleton instance**
var module = require(‘MyApp.Module’);

**Get a unique instance**
var module = requireUnique(‘MyApp.Module’);




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