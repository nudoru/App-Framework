/**
 * Application controller
 */

define('app/App',
  function (require, module, exports) {

    var _this,
        _noriEventConstants = require('nori/events/EventConstants');

    /**
     * Application bootstrapper. Create the model and views and pass to the app
     * to initialize.
     */
    function initialize() {
      _this = this;

      Nori.dispatcher().subscribe(_noriEventConstants.APP_MODEL_INITIALIZED, onModelInitialized.bind(this), true);

      // 1
      this.initializeApplication({
        model: this.createApplicationModel(require('app/model/AppModel')),
        view : this.createApplicationView(require('app/view/AppView'))
      });

      // 2
      this.view().initialize();
      // model will acquire data as needed and dispatch event when complete
      this.model().initialize();
    }

    /**
     * When model data has been loaded
     */
    function onModelInitialized() {
      // 3
      this.view().removeLoadingMessage();
      this.view().render();

      // 4 Start it with the route in the current URL
      this.setCurrentRoute(APP.router().getCurrentRoute());

      //restTesting();
    }

    function restTesting() {
      var request = require('nori/service/rest');

      request.request({method: 'GET', url: '/items', json: true}).then(
        function success(data) {
          console.log(data);
        }).catch(
        function error(data) {
          console.log(data);
        });

      request.request({method: 'POST', url: '/items', data: JSON.stringify({key:'value'}), json: true}).then(
      function success(data) {
        console.log(data);
      }).catch(
      function error(data) {
        console.log(data);
      });

      request.request({method: 'PUT', url: '/items/42', data: JSON.stringify({key:'value'}), json: true}).then(
        function success(data) {
          console.log(data);
        }).catch(
        function error(data) {
          console.log(data);
        });

      request.request({method: 'DELETE', url: '/items/42', json: true}).then(
        function success(data) {
          console.log(data);
        }).catch(
        function error(data) {
          console.log(data);
        });
    }

    //----------------------------------------------------------------------------
    //  Handle server or incoming events
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    module.exports.initialize = initialize;

  });