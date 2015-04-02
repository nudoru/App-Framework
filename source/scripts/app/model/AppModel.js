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

APP.AppModel = (function() {
  var _eventDispatcher,
      _self,
      _dataProvider,
      _data,
      _currentFreeTextFilter,
      _currentDataFilters,
      _currentItem,
      _filterProperties;

  //----------------------------------------------------------------------------
  //  Accessors
  //  array.slice(0) returns a COPY of the array not the actual array
  //----------------------------------------------------------------------------

  function getModelData() {
    return _data.slice(0);
  }

  function getFilterProperties() {
    return _filterProperties.slice(0);
  }

  function getCurrentDataFilters() {
    return _currentDataFilters.slice(0);
  }

  function setCurrentFreeTextFilter(filter) {
    if(filter === _currentFreeTextFilter) {
      return;
    }
    updateFreeTextFilter(filter);
  }

  function getCurrentFreeTextFilter() {
    return _currentFreeTextFilter;
  }

  function setCurrentItem(id) {
    _currentItem = id;
  }

  function getCurrentItem() {
    return _currentItem;
  }

  function getFiltersForURL() {
    var filters = '',
      //freeText = 'search='+encodeURIComponent(_currentFreeTextFilter),
      //currentItem = 'item='+encodeURIComponent(_currentItem),
      str = '';

    if(_currentDataFilters) {
      filters = _currentDataFilters.map(function(filter) {
        return encodeURIComponent(filter.split(' ').join('_'));
      }).join("/");
    }

    //TODO optimize

    if(filters) {
      str += filters;
    }

    if(_currentFreeTextFilter || _currentItem) {
      str += '?';
    }

    if(_currentFreeTextFilter) {
      str += 'search='+encodeURIComponent(_currentFreeTextFilter);
    }

    if(_currentFreeTextFilter && _currentItem) {
      str += '&';
    }

    if(_currentItem) {
      str += 'item='+encodeURIComponent(_currentItem);
    }

    //return filters + '?'+freeText +'&'+ currentItem;
    return str;
  }

  //----------------------------------------------------------------------------
  //  Initialization
  //----------------------------------------------------------------------------

  function initialize() {
    _self = this;

    // Define the data that will be used to sort/filter the data
    // filter is a property on the itemVO
    _filterProperties = [
      {label: 'Company Area', filter:'companyArea', data:[], menuData:[]},
      {label: 'Category', filter:'categories', data:[], menuData:[]},
      {label: 'Complexity', filter: 'complexity', data:[], menuData:[]}
    ];

    _currentFreeTextFilter = '';
    _currentDataFilters = [];
    _currentItem = '';

    _eventDispatcher = APP.EventDispatcher;

    _eventDispatcher.publish(APP.Events.MODEL_INITIALIZED);
  }

  function loadModelData() {
    createTestData();
  }

  function createTestData() {
    _dataProvider = APP.AppModel.DummyData;
    _dataProvider.initialize();

    _data = _dataProvider.getItems();

    onModelDataLoaded();
  }

  function onModelDataLoaded() {
    filterProperties();

    _eventDispatcher.publish(APP.Events.MODEL_DATA_LOADED);
  }



  //----------------------------------------------------------------------------
  //  Data
  //----------------------------------------------------------------------------

  /**
   * Based on data in the _filterproperties, builds a list of sortable values for
   * the data
   */
  function filterProperties() {
    _filterProperties.forEach(function(filter) {
      var props = [];
      _data.forEach(function(item) {
        if(item.hasOwnProperty(filter.filter)) {
          var itemPropVal = item[filter.filter];
          if(typeof itemPropVal === 'string') {
            props.push(itemPropVal);
          } else if(itemPropVal instanceof Array) {
            props = props.concat(itemPropVal);
          }
        }
      });
      filter.data = ArrayUtils.unique(props).sort();
      filter.menuData = getDataFormattedForMenu(filter.data);
    });
  }

  /**
   * Format an array of sortable items for the drop down menu component
   * @param data
   * @returns {Array}
   */
  function getDataFormattedForMenu(data) {
    var arry = [];
    data.forEach(function(item) {
      arry.push({label:item, value:item, toggle: true});
    });
    return arry;
  }

  function getMenuData() {
    var data = [];

    _filterProperties.forEach(function(filter) {
      data.push({
        label: filter.label,
        items: filter.menuData
      });
    });

    return data;
  }

  /**
   * Returns an object for the ID specified
   * If more than one ID is found, on the first will be returned.
   * @param itemid
   * @returns {void|*}
   */
  function getItemObjectForID(itemid) {
    var items = _data.filter(function(item) {
      if(item.id === itemid) {
        return true;
      } else {
        return false;
      }
    });

    // Returns a clone of the item
    return $.extend({}, items[0]);
  }

  function handledFiltersUpdated() {
    _eventDispatcher.publish(APP.Events.DATA_FILTER_CHANGED);
  }

  /**
   * Adds a new sorting filter
   * @param filter
   */
  function addFilter(filter) {
    _currentDataFilters.push(filter);
    handledFiltersUpdated();
  }

  /**
   * Replaces current filters with a new set
   * @param filter
   */
  function setMultipleFilters(filters) {
    _currentDataFilters = filters;
    handledFiltersUpdated();
  }

  /**
   * Removes a sorting filter
   * @param filter
   */
  function removeFilter(filter) {
    var idx = _currentDataFilters.indexOf(filter);
    if(idx > -1) {
      _currentDataFilters.splice(idx, 1);

      handledFiltersUpdated();
    }
  }

  /**
   * Add or remove a filter
   * @param filter
   */
  function toggleFilter(filter) {
    if(hasCurrentFilter(filter)) {
      removeFilter(filter);
    } else {
      addFilter(filter);
    }
  }

  /**
   * Is a Filter currently applied
   * @param filter
   * @returns {boolean}
   */
  function hasCurrentFilter(filter) {
    return _currentDataFilters.indexOf(filter) > -1;
  }

  /**
   * Add filter text from the input field
   * @param filter
   */
  function updateFreeTextFilter(filter) {
    if (filter.length < 3) {
      _currentFreeTextFilter = '';
    } else {
      _currentFreeTextFilter = filter.toLowerCase();
    }

    handledFiltersUpdated();
  }

  function getDataMatchingFilters() {
    var data = getDataMatchingFreeText(),
        filteredData = [];

    if(_currentDataFilters.length) {
      filteredData = data.filter(function(item) {
        return doesItemMatchFilters(item);
      });
    } else {
      filteredData = data;
    }

    return filteredData;
  }

  function doesItemMatchFilters(item) {
    var matched = true;

    _currentDataFilters.forEach(function(filter) {
      var propFilter = _filterProperties[getFilterPropIndexForFilter(filter)],
          itemPropVal = item[propFilter.filter];

      matched = matched && (itemPropVal.indexOf(filter) >= 0);
    });

    return matched;
  }

  /**
   * Returns the index of the filterProperties item that contains the matching
   * applied filter
   * @param filter
   * @returns {number}
   */
  function getFilterPropIndexForFilter(filter) {
    var i = 0,
        len = _filterProperties.length;

    for(;i<len;i++) {
      if(_filterProperties[i].data.indexOf(filter) >= 0) {
        return i;
      }
    }

    return -1;
  }

  function doesItemTitleMatchFreeText(item) {
    if(item.title.toLowerCase().indexOf(_currentFreeTextFilter) !== -1) {
      return true;
    }
    return false;
  }

  function doesItemTagMatchFreeText(item) {
    var i = 0,
        len = item.tags.length;

    for(;i<len; i++) {
      if(item.tags[i].toLowerCase().indexOf(_currentFreeTextFilter) !== -1) {
        return true;
      }
    }

    return false;
  }

  function getDataMatchingFreeText() {
    if(_currentFreeTextFilter === '') {
      return _data;
    }

    var titleMatches = _data.filter(doesItemTitleMatchFreeText);
    var tagMatches = _data.filter(doesItemTagMatchFreeText);

    return titleMatches.concat(tagMatches);
  }

  function removeAllFilters() {
    _currentFreeTextFilter = '';
    _currentDataFilters = [];
    handledFiltersUpdated();
  }

  function anyFiltersApplied() {
    if(_currentFreeTextFilter !== '' || _currentDataFilters.length > 0) {
      return true;
    }
    return false;
  }

  /**
   * Parse the list of currently applied filters for the TagBarView
   * @returns {Array}
   */
  function getFiltersForTagBar() {
    return getCurrentDataFilters();
  }

  /*
   var filters = _currentDataFilters.map(function(filter) {
   return encodeURIComponent(filter.split(' ').join('_'));
   }).join("/"),
   freeText = 'search='+encodeURIComponent(_currentFreeTextFilter),
   currentItem = 'item=0';

   return filters + '?'+freeText +'&'+ currentItem;
   */

  function parseFiltersFromURL(urlFilters) {
    var fragments = urlFilters.split('?'),
        filters = fragments[0],
        query = '?'+fragments[1],
        search = getURLSearchParameterByName('search', query),
        item = getURLSearchParameterByName('item',query),
        filterArry = filters
          .split('/')
          .map(function(filter) {
            return decodeURIComponent(filter.split('_').join(' '));
          })
          .filter(function(filter){
            if(isValidFilter(filter)) {
              return true;
            }
            return false;
          });

    //console.log('filters: '+filters);
    //console.log('query: '+query);
    //console.log('search: '+search);
    //console.log('item: '+item);

    //setMultipleFilters(filterArry);
    //setCurrentFreeTextFilter(search);
    //setCurrentItem(item);

    _eventDispatcher.publish(APP.Events.RESUME_FROM_MODEL_STATE,{filters: filterArry, search: search, item: item});
  }

  function getURLSearchParameterByName(name, str) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(str);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }

  function isValidFilter(filter) {
    var i = 0,
      len = _filterProperties.length;

    for(;i<len;i++) {
      if(_filterProperties[i].data.indexOf(filter) >= 0) {
        return true;
      }
    }

    return false;
  }

  //----------------------------------------------------------------------------
  //  API
  //----------------------------------------------------------------------------

  return {
    initialize: initialize,
    loadModelData: loadModelData,
    getData: getModelData,
    getFilterProperties: getFilterProperties,
    getMenuData: getMenuData,
    getItemObjectForID: getItemObjectForID,
    getCurrentFreeTextFilter: getCurrentFreeTextFilter,
    setCurrentFreeTextFilter: setCurrentFreeTextFilter,
    getCurrentDataFilters: getCurrentDataFilters,
    setMultipleFilters: setMultipleFilters,
    setCurrentItem: setCurrentItem,
    getCurrentItem: getCurrentItem,
    getFiltersForURL: getFiltersForURL,
    parseFiltersFromUrl: parseFiltersFromURL,
    addFilter: addFilter,
    removeFilter: removeFilter,
    toggleFilter: toggleFilter,
    getDataMatchingFilters: getDataMatchingFilters,
    removeAllFilters: removeAllFilters,
    anyFiltersApplied: anyFiltersApplied,
    getFiltersForTagBar: getFiltersForTagBar
  };

}());