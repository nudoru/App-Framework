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
    _containerEl = $(elID);

    _floatImageView = APP.AppView.FloatImageView;
    _floatImageView.initialize();

    _itemDTemplateSrc = ''
    +'<div class="content">'

      +'<div class="title">'
       +'<h1><%= title %></h1>'
      +'</div>'
      +'<div class="description">'
          +'<div class="extras">'
            +'<button id="item-details-share-button" class="basic-button share-button"><i class="fa fa-share-alt"></i><em>Share</em></button>'
          +'</div>'
          +'<div class="description-data">'
            +'<ul>'
              +'<li class="lob icon-left"><i class="fa fa-building"></i>Created for <em><%= companyArea %></em></li>'
              +'<li class="date icon-left"><i class="fa fa-calendar"></i>Completed on <em><%= dateCompleted %></em></li>'
              +'<li class="duration icon-left"><i class="fa fa-clock-o"></i>The solution is <em><%= duration %></em> long</li>'
              +'<li class="complexity icon-left"><i class="fa fa-puzzle-piece"></i><em><%= complexity %></em> complexity</li>'
            +'</ul>'
          +'</div>'

        +'<div class="preview-images">'
          +'<ul>'
          +'<% _.each(images, function(image) { %>'
          +'<li><div class="float-image"><img src="<%= image %>" alt="<%= title %> preview image"></div></li>'
          +'<% }); %>'
          +'</ul>'
        +'</div>'
        +'<%= description %>'
        +'<div class="description-metadata">'
          +'<ul>'
          +'<% _.each(categories, function(cat) { %>'
          +'<li class="type icon-left"><i class="fa fa-cube"></i><%= cat %></li>'
          +'<% }); %>'
          +'<% _.each(tags, function(tag) { %>'
          +'<li class="type icon-left"><i class="fa fa-tag"></i><%= tag %></li>'
          +'<% }); %>'
          +'</ul>'
        +'</div>'
        +'<div class="content-links">'
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
      +'<div class="content">'
      +'<div class="title">'
      +'<h1><%= title %></h1>'
      +'</div>'
      +'<div class="description">'
      +'<%= description %>'
      +'</div>'
      +'</div>';

    _messageTemplate = _.template(_messageTemplateSrc);
  }

  function showItem(item) {
    _currentItem = item;

    _containerEl.html(_itemDTemplate(_currentItem));

    _floatImageView.apply(_containerEl.find('.preview-images'));

    _shareButtonEl = document.getElementById('item-details-share-button');
    _shareButtonEl.addEventListener(APP.globals().mouseClickEvtStr, doShareAction, false);

    TweenMax.to(_containerEl, 0.25, {autoAlpha: 1, ease:Quad.easeOut, delay:0.1});
  }

  function doShareAction() {
    var shareStr = 'mailto:?subject=I\'m sharing: '
      +_currentItem.title+'&body=I thought you would like this ... <br><br>'
      +'<a href="'+document.location.href+'">'+_currentItem.title+'</a><br><br>'
      +_currentItem.description;
    var shareWin = window.open(shareStr);
    shareWin.close();
  }

  function showMessage(obj) {
    _containerEl.html(_messageTemplate(obj));

    TweenMax.to(_containerEl, 0.25, {autoAlpha: 1, ease:Quad.easeOut, delay:0.1});
  }

  function hide() {
    _currentItem = null;

    _floatImageView.remove(_containerEl.find('.preview-images'));

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