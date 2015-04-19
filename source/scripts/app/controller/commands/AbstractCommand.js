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
      throw new Error('AbstractCommand: Must subclass and override execute()');
    }
  }
};