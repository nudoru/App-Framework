## This is wildly out of date! I'm updating slowly ...

# NORI App Framework

[![Build Status](https://travis-ci.org/nudoru/App-Framework.svg?branch=master)](https://travis-ci.org/nudoru/App-Framework)

Nori is a handy starting template for my JS projects based on some ideas from: Redux, Flux, Model-View-Intent, React, Mithril and other interesting ideas. I created it to help me learn to be a JavaScript Ninja by implementing features that I like rather than using someone else's implementation or framework.

Dependencies:
- RxJS
- GreenSock Animation Platform
- Lodash
- my Nudoru utility classes - more information at the bottom

## Data Flow

The flow of data in an application is one direction and generally follows ideas from Flux.

8/14/15 Each model data object (Map, MapCollection and SimpleModel) provide an RxJS Subject that you subscribe to via the subscribe() method and no longer dispatch change events to the global bus. This requires you explicitly declare a dependency on the model you want, usually in a view component.

```
     ┌──────────────────────────────┬──────────────────────────┐
D    │                              │                          │
a    │                              ▼                          │
t    │                 ┌────────────────────────┐              │
a    │                 │  Event source: view,   │              │
     │                 │      model, etc.       │              │
F    │                 └────────────────────────┘              │
l    │                              │                          │
o    │                              ▼                          │
w    │                 ┌────────────────────────┐              │
│    │                 │Event Creator -> Wrapper│              │
│    │                 │  functions to publish  │              │
│    │                 │    events from the     │              │
│    │                 │       Dispatcher       │              │
│    │                 └────────────────────────┘              │
│    │                              │                          │
│    │                              ▼                          │
│    │                     Event with payload                  │
│    │                              │                          │
│    │               ┌──────────────┴────────────┐             │
│    │               │                           │             │
│    │               ▼                           ▼             │
│    │  ┌────────────────────────┐  ┌────────────────────────┐ │
│    │  │Global receiver -> MyApp│  │ Event Subscriber: any  │ │
│    │  │  Model, receives all   │  │       app object       │ │
│    │  │         events         │  │                        │ │
│    │  └────────────────────────┘  └────────────────────────┘ │
│    │               │                           │             │
│    │               ▼                           │             │
│    │  ┌────────────────────────┐               └─────────────┘
│    │  │                        │
│    │  │     Update stores      │
│    │  │                        │
│    │  └────────────────────────┘
│    │               │
│    │               ▼
│    │    Model change event is
│    │     received by Nori App
│    │    subscriber and updates
│    │         bound models
│    │               │
│    │               ▼
│    │  ┌────────────────────────┐
│    │  │                        │
│    └──│    Sub Views Update    │
▼       │                        │
        └────────────────────────┘
```

## Define / Require

I created my own client side define/require module system that works without the need to for a build process packager. Modules are based on the CommonJS format. Source is in the `source/nudoru/require.js` file

**Everything in Nori is a module defined and required in this manner** except for the main Nori object.

Modules in Nori are created like typical closures and not created with prototypical inherence / constructors in mind. New instances are created with Lodash’s `_.assign` method to copy enumerable properties to a new object (concatenative inheritance). Extending modules with mixins is common and leveraged in Nori factory functions to extend functionality of core components. The Application View is a great example.

### To define a module:
```javascript
define(‘app/Module’,
  function (require, module, exports) {
		module.exports.method = function() { … };
  });
```

Module names are the file path to the module JS file. Public functionality is exposed via the `module.exports` object.

### Require a module:

**Get a singleton instance**
```javascript
var module = require(‘app/Module’);
```

**Get a unique instance**
```javascript
var module = requireNew(‘app/Module’);
```

## Dispatcher / Events

The `scripts/nori/utils/Dispatcher.js` is a pub/sub system that uses RxJS subjects. You can subscribe to events with it and publish events. Subscribing to an event returns a RxJS subscription.

Events are ‘magic’ strings. Nori defines core application ones in the `scripts/events/AppEvents.js` and `scripts/nudoru/browser/BrowserEvents.js` modules.

Example:
```javascript
_dispatcher.subscribe(_appEventConstants.UPDATE_MODEL_DATA, function execute(payload) {
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

### Event payload object

A standard event payload object consists of a `type` key containing the string type of the event. The `payload` key contains an object of the data passed for the event.

### Event Creator

Inspired by Flux, you may create an EventCreator module that will wrap publishes in more standard ways. This isn’t required but it’s nice convince sake since it’s abstracts the syntax of the payload object. Nori utilized this for application events in the `Nori.Events.AppEventCreator` module.

```javascript
exports.viewRendered = function(targetSelector, id) {
  _dispatcher.publish({
    type: _appEventConstants.VIEW_RENDERED,
    payload: {
      target: targetSelector,
      id: id
    }
  });
};
```

### Registering for all published events

Inspired by the Flux Dispatcher, modules may also register with the dispatcher and receive all events published.

```javascript
_dispatcher.registerReceiver(handlerFunc);
```
The event payload object will be passed to the handerFunc. Per Flux recommendations, a `switch` statement on the `payloadObj.type` may be used to handle specific events.

## Application Bootstrapper

A bootstrapper module is required to set up models, views and anything else needed configure the application before it’s run. It should be created as a global object (for convenience) an initialized like this:

```javascript
// Create the application instance
window.TT = Nori.createApplication(require(‘TT.TimeTrackerApplication’));
// Kick off the bootstrapping process
TT.initialize();
```

The `initialize()` function is custom for your application. It should initialize the Nori framework by calling `initializeApplication()`.

## Application Model

The `Nori.Model.ApplicationModel` module provides a basic starting point for a more specific application model / bootstrapper and factory functions for creating new Model Store and Collection data types. You may create your own by calling the `Nori.createMap` factory and extending this class or Nori will just use the basic module if none is specified on the `Nori.initialize()` call.

### Model and Model Collection Objects

Nori includes a Map (based on an object key/value pair) and Map Collection (array of Maps) datatype objects.

The Nori app contains helper methods to create these:

```javascript
var myMap = MyApp.model().createMap({id:'mymodel', store:{key:value, key:value}, {
    optionalMethods: function() { ... };
  });

var myCollection = MyApp.model().createMapCollection({id:'mycollection', {
    optionalMethods: function() { ... };
  });
```

If silent is indicated then changes via `set` will not dispatch a `AppEvents.MODEL_DATA_CHANGED` event.

Model collections will dispatch this event when one of their member models is changed unless `{silent:true}` is specified on the set method.

## Application View

The `Nori.View.ApplicationView` module provides a basic starting point for a specific application view / bootstrapper and factory functions for creating new subviews.

Calling the `Nori.createApplicationView()` function will create this for you and mixin the custom specific application view module you pass it. Nori also combines functionality for subviews and URL routes and an event delegator.

### Routes

Routes are paths to specific subviews on the URL string after the # mark. You map specific URL routes to specific view modules the application dispatcher:

```javascript
MyApp.mapRouteView(‘/Path’, ‘UniqueID’, ‘ModuleName’);
```

The ModuleName will be called with requireNew to obtain an unique instance.

The `Nori.Utils.Router` module controls the core functionality of the routing system. When the route changes (URL hashChange event), Nori listens for this and coordinates the display of the proper subview in the application.

Query parameters, may be accessed from `Nori.getCurrentRoute()`. The returned object will have two keys: `route` will be the string from the URL and `data` will have parsed query pairs.

### Event Delegator

Inspired by Backbone, there Event delegator module adds the ability to easily add events to UI elements.

Events are defined via the `setEvents` function with the event type and selector as the key and the handler function as the value.

```javascript
setEvents({
    ‘change #tc_p_table’:handleInputChangeEvent,
    ‘click #tc_btn-submit’:handleSubmit
  });
```

Calling `delegateEvents()` will parse the events object and assign RxJS observers to the elements as specified.

To remove the events and dispose the subscribers, call `undelegateEvents()`.

## Application SubViews

Subviews represent smaller parts of the larger application view. They may be large or small in scope. The `Nori.View.ApplicationSubView` module provides the basis for functionality.

You create a new subview by extending your custom view with this base functionality and overwrite the stub lifecycle functions:

- viewWillUpdate - Update model data from any stores
- viewDidUpdate
- viewWillRender
- viewDidRender
- viewWillMount
- viewDidUnmount - attach any listeners and perform DOM manipulation on the subview’s DOM
- viewWillUnmount - perform clean up
- viewDidUnmout

Subviews are mapped to the application view by configuring them with a route or mapping directly:

```javascript
// false indicates it’s not a route view
mapViewComponent(‘UniqueID’, ‘ModuleName’, false, ‘mountPointSelector’);
```

The `UniqueID` maps to an HTML template that should be located in the main HTML file. A prefix of `template__` is prepended to the id like so:

```html
<script id=“template__UniqueID” type=“text/template”>
    <div>
        <p><%= content %>
    </div>
</script>
```

Subviews leverage Lodash’s `_.template` functionality through the `Nori.Utils.Templating` module.

Subviews also have the Event Delegator functionality of the application view.

### Renderer

Subviews depend on the centralized `Nori.View.Renderer` for rendering their HTML into DOM elements and attaching it to parent containers (mount points). Centralizing the rendering like this is mainly for future enhancement such as DOM diffing.

The Render module listens for the `RENDER_VIEW` event from the dispatcher and then renders the content passed in the payload. It calls the passed callback with the rendered DOM element as the argument.

In the `mount()` function:

```javascript
// Event Creator function
_appEvents.renderView(_mountPoint, _html, _id, (function(domEl) {
  setDOMElement(domEl);
  this.delegateEvents();
}).bind(this));
```

### Event Delegator

See the section above for information on how the delegator works.

In a subview, events should be set in the `initialize()` function. `delegateEvents()` is called automatically in `mount()` function and `undelegateEvents()` is called on `unmount()`

### Decorating (mixin) Subviews

Subviews may be extended with decorators (mixins) to enhance functionality. The `decorateSubViewController()` will extend a mapped subview controller with an array of modules. It uses the Lodash `_.assign` function to copy enumerable properties.

```javascript
decorateSubViewController(‘Timecard’, [requireNew(‘TT.View.TTSubViewModuleCommon’)]);
```

### SubView binding to Model store

UPDATE: Views should subscribe to the specific models that they wish to monitor. 

OUT OF DATE Data flow:

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

The subview can decide to rerender or just update what when the model updates. This allows to flexibility and optimizations since Nori doesn’t have any DOM diffing functionality to optimize DOM updates.

# Nudoru Components / Utils

Collection of utility and helper classes.

## nudoru/core

Utilities for working with data types

## nudoru/browser

Utilities for working on with a browser, DOM, etc.

## nudoru/components

UI Components for web apps
