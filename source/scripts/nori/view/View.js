define('Nori.View',
  function (require, module, exports) {

    var _appContainerEl,
      _appEl,
      _browserEventView = require('Nori.View.BrowserEvents'),
      _routeSubViewView = require('Nori.View.SubRouteViews'),
      _notificationView = require('nudoru.components.ToastView'),
      _toolTipView = require('nudoru.components.ToolTipView'),
      _messageBoxView = require('nudoru.components.MessageBoxView'),
      _modalCoverView = require('nudoru.components.ModalCoverView');

    //----------------------------------------------------------------------------
    //  Accessors
    //----------------------------------------------------------------------------

    function getAppContainerEl() {
      return _appContainerEl;
    }

    function getAppEl() {
      return _appEl;
    }

    //----------------------------------------------------------------------------
    //  Initialization
    //----------------------------------------------------------------------------

    function initialize() {
      render();
    }

    /**
     * Basic rendering and component init
     */
    function render() {
      _appContainerEl = document.getElementById('app__container');
      _appEl = document.getElementById('app__contents');

      _browserEventView.setMainScrollingView('app__contents');
      _browserEventView.initializeEventStreams();
      _browserEventView.setPositionUIElementsOnChangeCB(layoutUI);

      _routeSubViewView.setRouteViewMountPoint('contents');

      _toolTipView.initialize('tooltip__container');
      _notificationView.initialize('toast__container');
      _messageBoxView.initialize('messagebox__container');
      _modalCoverView.initialize();
    }

    /**
     * Alter the UI on resize or scroll
     * @param sizeObj Props: width, height
     * @param scrollObj Props: left, top
     */
    function layoutUI(sizeObj, scrollObj) {
      //
    }

    //----------------------------------------------------------------------------
    //  Messaging
    //----------------------------------------------------------------------------

    /**
     * Show a message box
     * @param obj
     */
    function addMessageBox(obj) {
      _messageBoxView.add(obj);
    }

    /**
     * Show a popup message box
     * @param message
     */
    function showAlert(message) {
      addMessageBox({
        title: 'Alert',
        content: message,
        type: _messageBoxView.type().DEFAULT,
        modal: false
      });
    }

    /**
     * Show notificiation
     * @param obj
     */
    function addNotification(obj) {
      _notificationView.add(obj);
    }

    /**
     * Display a notification "toast"
     * @param title The title
     * @param message The message
     */
    function showNotification(message, title, type) {
      addNotification({
        title: title || "Notification",
        type: type || _notificationView.type().DEFAULT,
        message: message
      });
    }

    /**
     * After app initialization, remove the loading message
     */
    function removeLoadingMessage() {
      var cover = document.getElementById('initialization__cover'),
        message = document.getElementsByClassName('initialization__message')[0];

      TweenLite.to(cover, 1, {
        alpha: 0, ease: Quad.easeOut, onComplete: function () {
          document.body.removeChild(cover);
        }
      });

      TweenLite.to(message, 2, {
        top: "+=50px", ease: Quad.easeIn, onComplete: function () {
          cover.removeChild(message);
        }
      });
    }

    //----------------------------------------------------------------------------
    //  Composition
    //----------------------------------------------------------------------------


    /**
     * Map a sub view component
     * @param templateID
     * @param controller
     * @param mountpoint
     */
    function mapView(templateID, controller, mountpoint) {
      _routeSubViewView.mapView(templateID, controller, false, mountpoint);
    }

    /**
     * Show a sub view component
     * @param templateID
     * @param dataObj
     */
    function showView(templateID, dataObj) {
      _routeSubViewView.showView(templateID, dataObj);
    }

    /**
     * Pass to route sub view
     * @param templateID
     * @param controller
     */
    function mapRouteView(templateID, controller) {
      _routeSubViewView.mapRouteView(templateID, controller);
    }

    /**
     * Pass to route sub view
     * @param dataObj
     * @param previousStateData
     */
    function showRouteView(dataObj, previousStateData) {
      _routeSubViewView.showRouteView(dataObj, previousStateData);
    }

    /**
     * Update subview based on a change in bound model data
     * @param viewID
     * @param modelID
     * @param storeData
     */
    function updateViewData(viewID, storeData) {
     _routeSubViewView.updateViewData(viewID, storeData);
    }

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    exports.initialize = initialize;
    exports.addMessageBox = addMessageBox;
    exports.addNotification = addNotification;
    exports.alert = showAlert;
    exports.notify = showNotification;
    exports.removeLoadingMessage = removeLoadingMessage;
    exports.mapView = mapView;
    exports.showView = showView;
    exports.mapRouteView = mapRouteView;
    exports.showRouteView = showRouteView;
    exports.updateViewData = updateViewData;
    exports.layoutUI = layoutUI;

    exports.getAppContainerEl = getAppContainerEl;
    exports.getAppEl = getAppEl;

  });