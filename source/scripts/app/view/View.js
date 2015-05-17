define('APP.View',
  function (require, module, exports) {

    var _self,
      _appContainerEl,
      _appEl,
      _mainHeaderEl,
      _mainFooterEl,
      _emitter = require('nudoru.events.Emitter'),
      _eventDispatcher = require('nudoru.events.EventDispatcher'),
      _appEvents = require('APP.AppEvents'),
      _browserEventView = require('APP.View.MixinBrowserEvents'),
      _routeSubViewView = require('APP.View.MixinRouteViews'),
      _multiDeviceView = require('APP.View.MixinMultiDeviceView'),
      _notificationView = require('nudoru.components.ToastView'),
      _messageBoxView = require('nudoru.components.MessageBoxView'),
      _modalCoverView = require('nudoru.components.ModalCoverView');

    //----------------------------------------------------------------------------
    //  Accessors
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    //  Initialization
    //----------------------------------------------------------------------------

    function initialize() {
      _self = this;

      render();
    }

    function render() {
      _appContainerEl = document.getElementById('app__container');
      _appEl = document.getElementById('app__contents');
      _mainHeaderEl = document.getElementById('header');
      _mainFooterEl = document.getElementById('footer');

      _browserEventView.setMainScrollingView('app__contents');
      _browserEventView.initializeEventStreams();
      _browserEventView.setPositionUIElementsOnChangeCB(layoutUI);
      _routeSubViewView.setSubViewMountPoint('contents');
      // TODO - fix from previous refactors _multiDeviceView.initialize();

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

    function mapView(templateID, controller, unique) {
      _routeSubViewView.mapView(templateID, controller, unique);
    }

    function showView(viewObj) {
      _routeSubViewView.showView(viewObj);
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

  });