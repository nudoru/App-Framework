APP.AppController.initializeCommand('APP.AppController..GridViewItemsVisibleChangedCommand',
  function execute(data) {

    var message = data ? 'Showing '+data+' matches' : 'No matches found';
    this.appView.updateSearchHeader(message);
  });