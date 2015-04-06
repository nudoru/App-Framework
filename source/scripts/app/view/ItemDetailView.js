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

    _itemDTemplateSrc = ''
    +'<div class="details__content">'

      +'<div class="details__content-title">'
       +'<h1><%= title %></h1>'
      +'</div>'
      +'<div class="details__content-description">'
          +'<div class="details__content-extras">'
            +'<button id="js__content-share-button" class="basic-button details__content-share-button"><i class="fa fa-share-alt"></i><em>Share</em></button>'
          +'</div>'
          +'<div class="details__content-description-data">'
            +'<ul>'
              +'<li class="lob icon-left"><i class="fa fa-building"></i>Created for <em><%= companyArea %></em></li>'
              +'<li class="date icon-left"><i class="fa fa-calendar"></i>Completed on <em><%= dateCompleted %></em></li>'
              +'<li class="duration icon-left"><i class="fa fa-clock-o"></i>The solution is <em><%= duration %></em> long</li>'
              +'<li class="complexity icon-left"><i class="fa fa-puzzle-piece"></i><em><%= complexity %></em> complexity</li>'
            +'</ul>'
          +'</div>'

        +'<div class="details__content-preview-images">'
          +'<ul>'
          +'<% _.each(images, function(image) { %>'
          +'<li><div class="floatimage__srcimage"><img src="<%= image %>" alt="<%= title %> preview image"></div></li>'
          +'<% }); %>'
          +'</ul>'
        +'</div>'
        +'<%= description %>'
        +'<div class="details__content-description-metadata">'
          +'<ul>'
          +'<% _.each(categories, function(cat) { %>'
          +'<li class="type icon-left"><i class="fa fa-cube"></i><%= cat %></li>'
          +'<% }); %>'
          +'<% _.each(tags, function(tag) { %>'
          +'<li class="type icon-left"><i class="fa fa-tag"></i><%= tag %></li>'
          +'<% }); %>'
          +'</ul>'
        +'</div>'
        +'<div class="details__content-links">'
          +'<ul>'
          +'<% _.each(links, function(link) { %>'
          +'<li class="icon-left"><a href="<%= link %>" target="_blank"><i class="fa fa-external-link"></i><%= link %></a></li>'
          +'<% }); %>'
          +'</ul>'
        +'</div>'
      +'</div>'
    +'</div>';

    _itemDTemplate = _.template(_itemDTemplateSrc);

    _messageTemplateSrc = ''
      +'<div class="details__content">'
      +'<div class="details__content-title">'
      +'<h1><%= title %></h1>'
      +'</div>'
      +'<div class="details__content-description">'
      +'<%= description %>'
      +'</div>'
      +'</div>';

    _messageTemplate = _.template(_messageTemplateSrc);
  }

  function showItem(item) {
    _currentItem = item;

    _containerEl.innerHTML = _itemDTemplate(_currentItem);

    _floatImageView.apply(_containerEl.querySelector('.details__content-preview-images'));

    _shareButtonEl = document.getElementById('js__content-share-button');

    if(!APP.globals().mobile.any()) {
      _shareButtonEl.addEventListener(APP.globals().mouseClickEvtStr, doShareAction, false);
    } else {
      DOMUtils.addClass(_shareButtonEl, 'hidden');
    }

    TweenMax.to(_containerEl, 0.25, {autoAlpha: 1, ease:Quad.easeOut, delay:0.1});
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

    TweenMax.to(_containerEl, 0.25, {autoAlpha: 1, ease:Quad.easeOut, delay:0.1});
  }

  function hide() {
    _currentItem = null;

    _floatImageView.remove(_containerEl.querySelector('.details__content-preview-images'));

    if(_shareButtonEl) {
      _shareButtonEl.removeEventListener(APP.globals().mouseClickEvtStr, doShareAction);
    }

    TweenMax.killDelayedCallsTo(_containerEl);
    TweenMax.to(_containerEl, 0.25, {autoAlpha: 0, ease:Quad.easeOut, delay:0.1});
  }

  return {
    initialize: initialize,
    showItem: showItem,
    showMessage: showMessage,
    hide: hide
  };

}());