define('APP.AppView.TagBarView',
  function(require, module, exports) {

    var _mountPoint,
      _currentTags,
      _arrayUtils = require('nudoru.utils.ArrayUtils'),
      _template = require('nudoru.utils.NTemplate');

    function initialize(elID) {
      _mountPoint = document.getElementById(elID);
      _currentTags = [];

      hideBar();
    }

    /**
     * add or removes as necessary
     * @param newTags
     */
    function update(newTags) {
      if (newTags.length) {

        var currenttags = _currentTags.map(function (tag) {
            return tag.label;
          }),
          tagsToAdd = _arrayUtils.getDifferences(newTags, currenttags),
          tagsToRemove = _arrayUtils.getDifferences(currenttags, newTags);

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
      TweenLite.to(_mountPoint, 0.25, {autoAlpha: 1, ease: Circ.easeIn});
    }

    function hideBar() {
      TweenLite.to(_mountPoint, 0.25, {autoAlpha: 0, ease: Circ.easeIn});
    }

    function add(tag) {
      var tagnode = _template.asElement('template__tag-bar', {tag: tag});
      _mountPoint.appendChild(tagnode);
      _currentTags.push({label: tag, el: tagnode});
      TweenLite.from(tagnode, 0.5, {alpha: 0, y: '15px', ease: Quad.easeOut});
    }

    function remove(tag) {
      var rmv = _currentTags.filter(function (tagobj) {
        if (tagobj.label === tag) {
          return true;
        }
        return false;
      })[0];

      if (rmv) {
        _mountPoint.removeChild(rmv.el);
        _currentTags.splice(_currentTags.indexOf(rmv), 1);
      }
    }

    function removeAll() {
      _currentTags.forEach(function (tag) {
        _mountPoint.removeChild(tag.el);
      });
      _currentTags = [];
    }

    exports.initialize = initialize;
    exports.update =update;

  });