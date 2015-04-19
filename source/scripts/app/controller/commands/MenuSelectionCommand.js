APP.AppController.initializeCommand('APP.AppController.MenuSelectionCommand',
  function execute(data) {

    //console.log('MenuSelectionCommand: '+data);
    this.appModel.toggleFilter(data);
  });