define('APP.AppView.ItemDetailView',
  function(require, module, exports) {

    var _containerEl,
      _shareButtonEl,
      _currentItem,
      _template = require('nudoru.utils.NTemplate'),
      _floatImageView = require('nudoru.components.FloatImageView'),
      _browserInfo = require('nudoru.utils.BrowserInfo');

    function initialize(elID) {
      _containerEl = document.getElementById(elID);

      _floatImageView.initialize();
    }

    function showItem(item) {
      _currentItem = item;

      _containerEl.innerHTML = _template.asHTML('template__detail-item', _currentItem);

      _floatImageView.apply(_containerEl.querySelector('.details__content-preview-images'));
      _floatImageView.setScrollingView(_containerEl.querySelector('.details__content'));


      _shareButtonEl = document.getElementById('js__content-share-button');

      if (!_browserInfo.mobile.any()) {
        _shareButtonEl.addEventListener(_browserInfo.mouseClickEvtStr(), doShareAction, false);
      } else {
        _shareButtonEl.style.display = 'none';
      }

      TweenLite.to(_containerEl, 0.25, {
        autoAlpha: 1,
        ease: Quad.easeOut,
        delay: 0.1
      });
    }

    function doShareAction() {
      var shareStr = 'mailto:?subject=I\'m sharing: '
        + _currentItem.title + '&body=I thought you would like this ... \n\n'
          //+'<a href="'+document.location.href+'">'+_currentItem.title+'</a>\n\n'
        + document.location.href + '\n\n'
        + _currentItem.description;
      var shareWin = window.open(shareStr);
      //shareWin.close();
    }

    function showMessage(obj) {
      _containerEl.innerHTML = nudoru.utils.NTemplate.asHTML('template__detail-message', obj);

      TweenLite.to(_containerEl, 0.25, {
        autoAlpha: 1,
        ease: Quad.easeOut,
        delay: 0.1
      });
    }

    function hide() {
      _currentItem = null;

      _floatImageView.remove(_containerEl.querySelector('.details__content-preview-images'));

      if (_shareButtonEl) {
        _shareButtonEl.removeEventListener(_browserInfo.mouseClickEvtStr(), doShareAction);
      }

      TweenLite.killDelayedCallsTo(_containerEl);
      TweenLite.to(_containerEl, 0.25, {
        autoAlpha: 0,
        ease: Quad.easeOut,
        delay: 0.1
      });
    }

    exports.initialize = initialize;
    exports.showItem = showItem;
    exports.showMessage = showMessage;
    exports.hide = hide;

  });