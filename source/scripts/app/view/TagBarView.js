APP.createNameSpace('APP.AppView.TagBarView');

APP.AppView.TagBarView = (function() {
  var _containerEl,
      _tagTemplate,
      _currentTags;

  function initialize(elID) {
    _containerEl = document.getElementById(elID);
    _currentTags = [];

    _tagTemplate = _.template('<div class="tag"><%= tag %></div>');

    hideBar();
  }

  /**
   * add or removes as necessary
   * @param newTags
   */
  function update(newTags) {
    if(newTags.length) {

      var currenttags = _currentTags.map(function(tag) { return tag.label; }),
          tagsToAdd = ArrayUtils.getDifferences(newTags, currenttags),
          tagsToRemove = ArrayUtils.getDifferences(currenttags, newTags);

      tagsToRemove.forEach(function (tag) {
        remove(tag);
      });

      tagsToAdd.forEach(function (tag) {
        add(tag);
      });

      showBar();

    } else {
      removeAll();
      hideBar();
    }

  }

  function showBar() {
    TweenMax.to(_containerEl, 0.25, {autoAlpha: 1, ease: Circ.easeIn});
  }

  function hideBar() {
    TweenMax.to(_containerEl, 0.25, {autoAlpha: 0, ease: Circ.easeIn});

  }

  function add(tag) {
    var taghtml = _tagTemplate({tag: tag}),
        tagnode = DOMUtils.HTMLStrToNode(taghtml);

    _containerEl.appendChild(tagnode);

    _currentTags.push({label: tag, el: tagnode});

    TweenMax.from(tagnode,0.5,{alpha:0, y:'15px', ease:Quad.easeOut});
  }



  function remove(tag) {
    var rmv = _currentTags.filter(function(tagobj) {
      if(tagobj.label === tag) {
        return true;
      }
      return false;
    })[0];

    if(rmv) {
      _containerEl.removeChild(rmv.el);
      _currentTags.splice(_currentTags.indexOf(rmv),1);
    }
  }

  function removeAll() {
    _currentTags.forEach(function(tag) {
      _containerEl.removeChild(tag.el);
    });
    _currentTags = [];
  }

  return {
    initialize: initialize,
    update: update
  };

}());