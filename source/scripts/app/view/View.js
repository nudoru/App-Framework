define('APP.View',
  function (require, module, exports) {

    var _self,
      _appContainerEl,
      _appEl,
      _mainHeaderEl,
      _mainFooterEl,
      _eventDispatcher = APP.eventDispatcher(),
      _browserEventView = require('APP.View.MixinBrowserEvents'),
      _routeSubViewView = require('APP.View.MixinRouteViews'),
      _toastView = require('nudoru.components.ToastView'),
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

      _eventDispatcher.publish(APP.AppEvents.VIEW_INITIALIZED);

      render();

      showAlert('<p>Donec sit amet massa sodales, sodales risus non, semper purus. Praesent ornare id purus vitae tincidunt. Nam lacinia pellentesque aliquam. Praesent vitae nisl consequat, varius erat nec, imperdiet nulla.<p>');
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

      _toastView.initialize('toast__container');
      _messageBoxView.initialize('messagebox__container');
      _modalCoverView.initialize();

      _eventDispatcher.publish(APP.AppEvents.VIEW_RENDERED);
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
     * Show a popup message box
     * @param message
     */
    function showAlert(message) {
      _messageBoxView.add({
        title: 'Alert',
        content: message,
        type: _messageBoxView.type().DEFAULT,
        modal: false
      });
    }

    /**
     * Display a notification "toast"
     * @param title The title
     * @param message The message
     */
    function showNotification(message, title, type) {
      title = title || "Notification";
      type = type || _toastView.type().DEFAULT;
      _toastView.add(title, message, type);
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
    exports.alert = showAlert;
    exports.notify = showNotification;
    exports.removeLoadingMessage = removeLoadingMessage;
    exports.mapView = mapView;
    exports.showView = showView;

  });