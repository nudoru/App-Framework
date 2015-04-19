APP.AppController.initializeCommand('APP.AppController.ResumeFromModelStateCommand',
  function execute(data) {

    var filters = data.filters,
      search = data.search,
      item = data.item;

    console.log('ResumeFromModel State, filters: ' + filters + ', search: ' + search + ', item: ' + item);

    if (filters) {
      this.appModel.setMultipleFilters(filters);
      this.appView.updateMenuSelections(this.appModel.getFiltersForTagBar());
    }

    if (search) {
      this.appView.setFreeTextFilterValue(search);
    }

    if (item) {
      nudoru.events.EventDispatcher.publish(APP.AppEvents.ITEM_SELECT, item);
    } else {
      this.appModel.setCurrentItem('');
      this.appView.hideItemDetailView();
    }

  });

