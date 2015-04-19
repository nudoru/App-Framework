/**
 * Extended by creating new object using methods as prototype
 */

APP.createNameSpace('APP.AppController.AbstractCommand');
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