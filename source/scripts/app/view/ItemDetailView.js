APP.createNameSpace('APP.AppView.ItemDetailView');

APP.AppView.ItemDetailView = (function() {
  var _containerEl,
      _itemDTemplate,
      _itemDTemplateSrc,
      _messageTemplate,
      _messageTemplateSrc,
      _floatImageView,
      _shareButtonEl,
      _currentItem;

  function initialize(elID) {
    _containerEl = document.getElementById(elID);

    _floatImageView = APP.AppView.FloatImageView;
    _floatImageView.initialize();

    _itemDTemplate = _.template(DOMUtils.getHTMLTemplate('template__detail-item'));
    _messageTemplate = _.template(DOMUtils.getHTMLTemplate('template__detail-message'));
  }

  function showItem(item) {
    _currentItem = item;

    _containerEl.innerHTML = _itemDTemplate(_currentItem);

    _floatImageView.apply(_containerEl.querySelector('.details__content-preview-images'));

    _shareButtonEl = document.getElementById('js__content-share-button');

    if(!APP.globals().mobile.any()) {
      _shareButtonEl.addEventListener(APP.globals().mouseClickEvtStr, doShareAction, false);
    } else {
      _shareButtonEl.style.display = 'none';
    }

    TweenLite.to(_containerEl, 0.25, {autoAlpha: 1, ease:Quad.easeOut, delay:0.1});
  }

  function doShareAction() {
    var shareStr = 'mailto:?subject=I\'m sharing: '
      +_currentItem.title+'&body=I thought you would like this ... <br><br>'
      +'<a href="'+document.location.href+'">'+_currentItem.title+'</a><br><br>'
      +_currentItem.description;
    var shareWin = window.open(shareStr);
    //shareWin.close();
  }

  function showMessage(obj) {
    _containerEl.innerHTML = _messageTemplate(obj);

    TweenLite.to(_containerEl, 0.25, {autoAlpha: 1, ease:Quad.easeOut, delay:0.1});
  }

  function hide() {
    _currentItem = null;

    _floatImageView.remove(_containerEl.querySelector('.details__content-preview-images'));

    if(_shareButtonEl) {
      _shareButtonEl.removeEventListener(APP.globals().mouseClickEvtStr, doShareAction);
    }

    TweenLite.killDelayedCallsTo(_containerEl);
    TweenLite.to(_containerEl, 0.25, {autoAlpha: 0, ease:Quad.easeOut, delay:0.1});
  }

  return {
    initialize: initialize,
    showItem: showItem,
    showMessage: showMessage,
    hide: hide
  };

}());