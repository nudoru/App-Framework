/*
 Filters:
 free text: title
 selected from menu

 When the free text changes
 on event from view -
 run search input command runs getDataMatchingFreeText(data)

 When a menu selection changes
 on event from

 ViewFilterChangedCommand fired from ItemGridView when the items are updated setNumItemsVisible

 */

APP.createNameSpace('APP.AppModel');

APP.AppModel = (function () {
  var _self,
    _appGlobals,
    _dataProvider,
    _data,
    _eventDispatcher = require('nudoru.events.EventDispatcher'),
    _arrayUtils = require('nudoru.utils.ArrayUtils'),
    _objectUtils = require('nudoru.utils.ObjectUtils');

  //----------------------------------------------------------------------------
  //  Accessors
  //  array.slice(0) returns a COPY of the array not the actual array
  //----------------------------------------------------------------------------

  function getModelData() {
    return _data.slice(0);
  }

  //function getFiltersForURL() {
  //  var filters = '',
  //  //freeText = 'search='+encodeURIComponent(_currentFreeTextFilter),
  //  //currentItem = 'item='+encodeURIComponent(_currentItem),
  //    str = '';
  //
  //  if (_currentDataFilters) {
  //    filters = _currentDataFilters.map(function (filter) {
  //      return encodeURIComponent(filter.split(' ').join('_'));
  //    }).join("/");
  //  }
  //
  //  if (filters) {
  //    str += filters;
  //  }
  //
  //  if (_currentFreeTextFilter || _currentItem) {
  //    str += '?';
  //  }
  //
  //  if (_currentFreeTextFilter) {
  //    str += 'search=' + encodeURIComponent(_currentFreeTextFilter);
  //  }
  //
  //  if (_currentFreeTextFilter && _currentItem) {
  //    str += '&';
  //  }
  //
  //  if (_currentItem) {
  //    str += 'item=' + encodeURIComponent(_currentItem);
  //  }
  //
  //  return str;
  //}

  //----------------------------------------------------------------------------
  //  Initialization
  //----------------------------------------------------------------------------

  function initialize() {
    _self = this;

    _appGlobals = APP.globals();

    _eventDispatcher.publish(APP.AppEvents.MODEL_INITIALIZED);
  }

  function loadModelData() {
    onModelDataLoaded();
  }

  function onModelDataLoaded() {
    _eventDispatcher.publish(APP.AppEvents.MODEL_DATA_LOADED);
  }


  //----------------------------------------------------------------------------
  //  Data
  //----------------------------------------------------------------------------


  //----------------------------------------------------------------------------
  //  API
  //----------------------------------------------------------------------------

  return {
    initialize: initialize,
    loadModelData: loadModelData
  };

}());