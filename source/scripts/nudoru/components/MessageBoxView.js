/**
 * Simple popup message box module
 *
 * Created by matt on 5/5/15
 * last updated 5/7/15
 */

define('nudoru.components.MessageBoxView',
  function (require, module, exports) {

    var _children = [],
      _counter = 0,
      _highestZ = 1000,
      _defaultWidth = 400,
      _types = {
        DEFAULT: 'default',
        INFORMATION: 'information',
        SUCCESS: 'success',
        WARNING: 'warning',
        DANGER: 'danger'
      },
      _typeStyleMap = {
        'default': '',
        'information': 'messagebox__information',
        'success': 'messagebox__success',
        'warning': 'messagebox__warning',
        'danger': 'messagebox__danger'
      },
      _mountPoint,
      _buttonIconTemplateID = 'template__messagebox--button-icon',
      _buttonNoIconTemplateID = 'template__messagebox--button-noicon',
      _template = require('nudoru.utils.NTemplate'),
      _modal = require('nudoru.components.ModalCoverView'),
      _browserInfo = require('nudoru.utils.BrowserInfo'),
      _domUtils = require('nudoru.utils.DOMUtils');

    /**
     * Initialize and set the mount point / box container
     * @param elID
     */
    function initialize(elID) {
      _mountPoint = document.getElementById(elID);
    }

    /**
     * Add a new message box
     * @param initObj
     * @returns {*}
     */
    function add(initObj) {
      var type = initObj.type || _types.DEFAULT,
        boxObj = createBoxObject(initObj);

      // setup
      _children.push(boxObj);
      _mountPoint.appendChild(boxObj.element);
      assignTypeClassToElement(type, boxObj.element);
      configureButtons(boxObj);
      _domUtils.centerElementInViewPort(boxObj.element);

      // Set 3d CSS props for in/out transition
      TweenLite.set(boxObj.element, {
        css: {
          transformPerspective: 800,
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          zIndex: _highestZ,
          width: (initObj.width ? initObj.width : _defaultWidth) + 'px'
        }
      });

      // Make it draggable
      Draggable.create('#' + boxObj.id, {
        bounds: window,
        onPress:function() {
          _highestZ = Draggable.zIndex;
        }
      });

      // Show it
      transitionIn(boxObj.element);

      // Show the modal cover
      if (initObj.modal) {
        _modal.showHard(true);
      }

      return boxObj.id;
    }

    /**
     * Assign a type class to it
     * @param type
     * @param element
     */
    function assignTypeClassToElement(type, element) {
      if (type !== 'default') {
        _domUtils.addClass(element, _typeStyleMap[type]);
      }
    }

    /**
     * Create the object for a box
     * @param initObj
     * @returns {{dataObj: *, id: string, modal: (*|boolean), element: *, streams: Array}}
     */
    function createBoxObject(initObj) {
      var id = 'js__messagebox-' + (_counter++).toString(),
        obj = {
          dataObj: initObj,
          id: id,
          modal: initObj.modal,
          element: _template.asElement('template__messagebox--default', {
            id: id,
            title: initObj.title,
            content: initObj.content
          }),
          streams: []
        };

      return obj;
    }

    /**
     * Set up the buttons
     * @param boxObj
     */
    function configureButtons(boxObj) {
      var buttonData = boxObj.dataObj.buttons;

      // default button if none
      if(!buttonData) {
        buttonData = [{
            label: 'Close',
            type: '',
            icon: 'times',
            id: 'default-close'
          }];
      }

      var buttonContainer = boxObj.element.querySelector('.footer-buttons');

      _domUtils.removeAllElements(buttonContainer);

      buttonData.forEach(function makeButton(buttonObj) {
        buttonObj.id = boxObj.id + '-button-' + buttonObj.id;

        var buttonEl;

        if(buttonObj.hasOwnProperty('icon')) {
          buttonEl = _template.asElement(_buttonIconTemplateID, buttonObj);
        }  else {
          buttonEl = _template.asElement(_buttonNoIconTemplateID, buttonObj);
        }

        buttonContainer.appendChild(buttonEl);

        var btnStream = Rx.Observable.fromEvent(buttonEl, _browserInfo.mouseClickEvtStr())
          .subscribe(function () {
            if(buttonObj.hasOwnProperty('onClick')) {
              buttonObj.onClick.call(this);
            }
            remove(boxObj.id);
          });

        boxObj.streams.push(btnStream);

      });

    }

    /**
     * Remove a box from the screen / container
     * @param id
     */
    function remove(id) {
      var idx = getObjIndexByID(id),
        boxObj;

      if (idx > -1) {
        boxObj = _children[idx];
        transitionOut(boxObj.element);
      }
    }



    /**
     * Show the box
     * @param el
     */
    function transitionIn(el) {
      TweenLite.to(el, 0, {alpha: 0, rotationX: 45});
      TweenLite.to(el, 1, {alpha: 1, rotationX: 0, ease: Circ.easeOut});
    }

    /**
     * Remove the box
     * @param el
     */
    function transitionOut(el) {
      TweenLite.to(el, 0.25, {
        alpha: 0,
        rotationX: -45,
        ease: Circ.easeIn, onComplete: function () {
          onTransitionOutComplete(el);
        }
      });
    }

    /**
     * Clean up after the transition out animation
     * @param el
     */
    function onTransitionOutComplete(el) {
      var idx = getObjIndexByID(el.getAttribute('id')),
        boxObj = _children[idx];

      boxObj.streams.forEach(function(stream) {
        stream.dispose();
      });

      Draggable.get('#' + boxObj.id).disable();

      _mountPoint.removeChild(el);

      _children[idx] = null;
      _children.splice(idx, 1);

      checkModalStatus();
    }

    /**
     * Determine if any open boxes have modal true
     */
    function checkModalStatus() {
      var isModal = false;

      _children.forEach(function (boxObj) {
        if (boxObj.modal === true) {
          isModal = true;
        }
      });

      if (!isModal) {
        _modal.hide(true);
      }
    }

    /**
     * Utility to get the box object by ID
     * @param id
     * @returns {number}
     */
    function getObjIndexByID(id) {
      var len = _children.length,
        i = 0;

      for (; i < len; i++) {
        if (_children[i].id === id) {
          return i;
        }
      }

      return -1;
    }

    exports.initialize = initialize;
    exports.add = add;
    exports.remove = remove;
    exports.type = function () {
      return _types
    };

  });