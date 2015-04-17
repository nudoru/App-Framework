APP.createNameSpace('APP.AppController.AbstractCommand');

/*
 Simplified implementation of Stamps
 http://ericleads.com/2014/02/prototypal-inheritance-with-stamps/
 From
 https://www.barkweb.co.uk/blog/object-composition-and-prototypical-inheritance-in-javascript
 */

APP.AppController.AbstractCommand = {
  methods: {

    app: APP,
    appController: APP.AppController,
    appModel: APP.AppModel,
    appView: APP.AppView,
    eventDispatcher: require('nudoru.events.EventDispatcher'),
    urlRouter: require('nudoru.utils.URLRouter'),

    execute: function (data) {
      console.log('Abstract command executing with data: ' + data);
    }
  }
};

// Template
/*
APP.createNameSpace('APP.AppController.TestingTestingCommand');
APP.AppController.TestingTestingCommand = APP.AppController.createCommand(APP.AppController.AbstractCommand);
APP.AppController.TestingTestingCommand.execute = function (data) {
  console.log('!!! TestingTestingCommand with data "' + data + '"');
};
*/