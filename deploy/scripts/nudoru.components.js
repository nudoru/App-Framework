define('nudoru.events.ComponentEvents',
  function(require, module, exports) {
    exports.MODAL_COVER_SHOW = 'MODAL_COVER_SHOW';
    exports.MODAL_COVER_HIDE = 'MODAL_COVER_HIDE';
    exports.MENU_SELECT = 'MENU_SELECT';
  });;define('nudoru.components.ComponentViewUtils',
  function (require, module, exports) {

    /**
     * Create shared 3d perspective for all children
     * @param el
     */
    function apply3DToContainer(el) {
      TweenLite.set(el, {
        css: {
          perspective: 800,
          perspectiveOrigin: '50% 50%'
        }
      });
    }

    /**
     * Apply basic CSS props
     * @param el
     */
    function apply3DToComponentElement(el) {
      TweenLite.set(el, {
        css: {
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          transformOrigin: '50% 50%'
        }
      });
    }

    /**
     * Apply basic 3d props and set unique perspective for children
     * @param el
     */
    function applyUnique3DToComponentElement(el) {
      TweenLite.set(el, {
        css: {
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          transformPerspective: 600,
          transformOrigin: '50% 50%'
        }
      });
    }

    exports.apply3DToContainer = apply3DToContainer;
    exports.apply3DToComponentElement = apply3DToComponentElement;
    exports.applyUnique3DToComponentElement = applyUnique3DToComponentElement;

  });
;define('nudoru.events.Emitter',
  function (require, module, exports) {
    var _subjectMap = {};

    /**
     * Add an event as observable
     * @param evtStr Event name string
     * @param handler onNext() subscription function
     * @param once will complete/dispose after one fire
     * @returns {*}
     */
    function subscribe(evtStr, handler, once) {
      _subjectMap[evtStr] || (_subjectMap[evtStr] = []);

      _subjectMap[evtStr] = {
        once: once,
        handler: handler,
        subject: new Rx.Subject()
      };

      return _subjectMap[evtStr].subject.subscribe(handler);
    }

    /**
     * Maps a module/command's execute() function as the handler for onNext
     * @param evtStr Event name string
     * @param cmdModule Module name
     * @param once will complete/dispose after one fire
     * @returns {*}
     */
    function subscribeCommand(evtStr, cmdModule, once) {
      var cmd = require(cmdModule);
      if(cmd.hasOwnProperty('execute')) {
        return subscribe(evtStr, cmd.execute, once);
      } else {
        throw new Error('Emitter cannot map '+evtStr+' to command '+cmdModule+': must have execute()');
      }
    }

    /**
     * Publish a event to all subscribers
     * @param evtStr
     * @param data
     */
    function publish(evtStr, data) {
      var subjObj = _subjectMap[evtStr];

      if(!subjObj) {
        return;
      }

      subjObj.subject.onNext(data);

      if(subjObj.once) {
        subjObj.subject.onCompleted();
        subjObj.subject.dispose();
        subjObj = null;
      }
    }

    /**
     * Cleanup
     */
    function dispose() {
      var subjects = _subjectMap;
      for (var prop in subjects) {
        if (hasOwnProp.call(subjects, prop)) {
          subjects[prop].subject.dispose();
        }
      }

      _subjectMap = {};
    }
    
    exports.subscribe = subscribe;
    exports.subscribeCommand = subscribeCommand;
    exports.publish = publish;
    exports.dispose = dispose;

  });;define('nudoru.components.MessageBoxView',
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
      _domUtils = require('nudoru.utils.DOMUtils'),
      _componentUtils = require('nudoru.components.ComponentViewUtils');

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

      _componentUtils.applyUnique3DToComponentElement(boxObj.element);

      // Set 3d CSS props for in/out transition
      TweenLite.set(boxObj.element, {
        css: {
          zIndex: _highestZ,
          width: initObj.width ? initObj.width : _defaultWidth
        }
      });

      // center after width has been set
      _domUtils.centerElementInViewPort(boxObj.element);

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
      TweenLite.to(el, 0, {alpha: 0, rotationX: 45, scale: 2});
      TweenLite.to(el,0.5, {alpha: 1, rotationX: 0, scale: 1, ease: Circ.easeOut});
    }

    /**
     * Remove the box
     * @param el
     */
    function transitionOut(el) {
      TweenLite.to(el, 0.25, {
        alpha: 0,
        rotationX: -45,
        scale: 0.25,
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
      return _children.map(function(child) { return child.id; }).indexOf(id);
    }

    exports.initialize = initialize;
    exports.add = add;
    exports.remove = remove;
    exports.type = function () {
      return _types
    };

  });;define('nudoru.components.ModalCoverView',
  function (require, module, exports) {
    var _mountPoint = document,
      _modalCoverEl,
      _modalBackgroundEl,
      _modalCloseButtonEl,
      _modalClickStream,
      _isVisible,
      _isHard,
      _emitter = require('nudoru.events.Emitter'),
      _componentEvents = require('nudoru.events.ComponentEvents'),
      _browserInfo = require('nudoru.utils.BrowserInfo');

    function initialize() {

      _isVisible = true;

      _modalCoverEl = _mountPoint.getElementById('modal__cover');
      _modalBackgroundEl = _mountPoint.querySelector('.modal__background');
      _modalCloseButtonEl = _mountPoint.querySelector('.modal__close-button');

      var modalBGClick = Rx.Observable.fromEvent(_modalBackgroundEl, _browserInfo.mouseClickEvtStr()),
        modalButtonClick = Rx.Observable.fromEvent(_modalCloseButtonEl, _browserInfo.mouseClickEvtStr());

      _modalClickStream = Rx.Observable.merge(modalBGClick, modalButtonClick)
        .subscribe(function () {
          onModalClick();
        });

      hide(false);
    }

    function getIsVisible() {
      return _isVisible;
    }

    function onModalClick() {
      if(_isHard) return;
      hide(true);
    }

    function showModalCover(animate) {
      _isVisible = true;
      var duration = animate ? 0.25 : 0;
      TweenLite.to(_modalCoverEl, duration, {autoAlpha: 1, ease: Quad.easeOut});
    }

    function show(animate) {
      if (_isVisible) {
        return;
      }

      _isHard = false;

      showModalCover(animate);
      TweenLite.to(_modalCloseButtonEl, duration * 2, {
        autoAlpha: 1,
        top: 22,
        ease: Back.easeOut,
        delay: 2
      });

      _emitter.publish(_componentEvents.MODAL_COVER_SHOW);
    }

    /**
     * A 'hard' modal view cannot be dismissed with a click, must be via code
     * @param animate
     */
    function showHard(animate) {
      if (_isVisible) {
        return;
      }

      _isHard = true;

      showModalCover(animate);
      TweenLite.to(_modalCloseButtonEl, 0, {autoAlpha: 0});
    }

    function hide(animate) {
      if (!_isVisible) {
        return;
      }
      _isVisible = false;
      _isHard = false;
      var duration = animate ? 0.25 : 0;
      TweenLite.killDelayedCallsTo(_modalCloseButtonEl);
      TweenLite.to(_modalCoverEl, duration, {autoAlpha: 0, ease: Quad.easeOut});
      TweenLite.to(_modalCloseButtonEl, duration / 2, {
        autoAlpha: 0,
        top: -50,
        ease: Quad.easeOut
      });

      _emitter.publish(_componentEvents.MODAL_COVER_HIDE);
    }

    exports.initialize = initialize;
    exports.show = show;
    exports.showHard = showHard;
    exports.hide = hide;
    exports.visible = getIsVisible;

  });;define('nudoru.utils.NTemplate',
  function(require, module, exports) {

    var _templateHTMLCache = Object.create(null),
      _templateCache = Object.create(null),
      _DOMUtils = require('nudoru.utils.DOMUtils');

    /**
     * Get the template html from the script tag with id
     * @param id
     * @returns {*}
     */
    function getSource(id) {
      if(_templateHTMLCache[id]) {
        return _templateHTMLCache[id];
      }

      var src = document.getElementById(id),
        srchtml = '',
        cleanhtml = '';

      if(src) {
        srchtml = src.innerHTML;
      } else {
        throw new Error('nudoru.utils.NTemplate, template not found: "'+id+'"');
      }

      cleanhtml = cleanTemplateHTML(srchtml);
      _templateHTMLCache[id] = cleanhtml;
      return cleanhtml;
    }

    /**
     * Returns an underscore template
     * @param id
     * @returns {*}
     */
    function getTemplate(id) {
      if(_templateCache[id]) {
        return _templateCache[id];
      }
      var templ = _.template(getSource(id));
      _templateCache[id] = templ;
      return templ;
    }

    /**
     * Processes the template and returns HTML
     * @param id
     * @param obj
     * @returns {*}
     */
    function asHTML(id, obj) {
      var temp = getTemplate(id);
      return temp(obj);
    }

    /**
     * Processes the template and returns an HTML Element
     * @param id
     * @param obj
     * @returns {*}
     */
    function asElement(id, obj) {
      return _DOMUtils.HTMLStrToNode(asHTML(id, obj));
    }

    /**
     * Cleans template HTML
     */
    function cleanTemplateHTML(str) {
      //replace(/(\r\n|\n|\r|\t)/gm,'').replace(/>\s+</g,'><').
      return str.trim();
    }

    exports.getSource = getSource;
    exports.getTemplate = getTemplate;
    exports.asHTML = asHTML;
    exports.asElement = asElement;

  });
;define('nudoru.components.ToastView',
  function (require, module, exports) {

    var _children = [],
      _counter = 0,
      _defaultExpireDuration = 7000,
      _types = {
        DEFAULT : 'default',
        INFORMATION : 'information',
        SUCCESS: 'success',
        WARNING: 'warning',
        DANGER: 'danger'
      },
      _typeStyleMap = {
        'default' : '',
        'information' : 'toast__information',
        'success' : 'toast__success',
        'warning' : 'toast__warning',
        'danger' : 'toast__danger'
      },
      _mountPoint,
      _template = require('nudoru.utils.NTemplate'),
      _browserInfo = require('nudoru.utils.BrowserInfo'),
      _domUtils = require('nudoru.utils.DOMUtils'),
      _componentUtils = require('nudoru.components.ComponentViewUtils');

    function initialize(elID) {
      _mountPoint = document.getElementById(elID);
    }

    //obj.title, obj.content, obj.type
    function add(initObj) {
      initObj.type = initObj.type || _types.DEFAULT;

      var toastObj = createToastObject(initObj.title, initObj.content);

      _children.push(toastObj);

      _mountPoint.insertBefore(toastObj.element, _mountPoint.firstChild);

      assignTypeClassToElement(initObj.type, toastObj.element);

      _componentUtils.apply3DToContainer(_mountPoint);
      _componentUtils.apply3DToComponentElement(toastObj.element);

      var closeBtn = toastObj.element.querySelector('.toast__item-controls > button'),
        closeBtnSteam = Rx.Observable.fromEvent(closeBtn, _browserInfo.mouseClickEvtStr()),
        expireTimeStream = Rx.Observable.interval(_defaultExpireDuration);

      toastObj.defaultButtonStream = Rx.Observable.merge(closeBtnSteam, expireTimeStream).take(1)
        .subscribe(function () {
          remove(toastObj.id);
        });

      transitionIn(toastObj.element);

      return toastObj.id;
    }

    function assignTypeClassToElement(type, element) {
      if(type !== 'default') {
        _domUtils.addClass(element, _typeStyleMap[type]);
      }
    }

    function createToastObject(title, message) {
      var id = 'js__toast-toastitem-' + (_counter++).toString(),
        obj = {
          id: id,
          element: _template.asElement('template__component--toast', {
            id: id,
            title: title,
            message: message
          }),
          defaultButtonStream: null
        };

      return obj;
    }

    function remove(id) {
      var idx = getObjIndexByID(id),
        toast;

      if (idx > -1) {
        toast = _children[idx];
        rearrange(idx);
        transitionOut(toast.element);
      }
    }

    function transitionIn(el) {
      TweenLite.to(el, 0, {alpha: 0});
      TweenLite.to(el, 1, {alpha: 1, ease: Quad.easeOut});
      rearrange();
    }

    function transitionOut(el) {
      TweenLite.to(el, 0.25, {
        rotationX: -45,
        alpha: 0,
        ease: Quad.easeIn, onComplete: function () {
          onTransitionOutComplete(el);
        }
      });
    }

    function onTransitionOutComplete(el) {
      var idx = getObjIndexByID(el.getAttribute('id')),
          toastObj = _children[idx];

      toastObj.defaultButtonStream.dispose();

      _mountPoint.removeChild(el);
      _children[idx] = null;
      _children.splice(idx, 1);
    }

    function rearrange(ignore) {
      var i = _children.length - 1,
        current,
        y = 0;

      for (; i > -1; i--) {
        if (i === ignore) {
          continue;
        }
        current = _children[i];
        TweenLite.to(current.element, 0.75, {y: y, ease: Bounce.easeOut});
        y += 10 + current.element.clientHeight;
      }
    }

    function getObjIndexByID(id) {
      return _children.map(function(child) { return child.id; }).indexOf(id);
    }

    exports.initialize = initialize;
    exports.add = add;
    exports.remove = remove;
    exports.type = function() { return _types };

  });;define('nudoru.components.ToolTipView',
  function (require, module, exports) {

    var _children = [],
      _counter = 0,
      _defaultWidth = 200,
      _endRotationTransform = -20,
      _types = {
        DEFAULT: 'default',
        INFORMATION: 'information',
        SUCCESS: 'success',
        WARNING: 'warning',
        DANGER: 'danger'
      },
      _typeStyleMap = {
        'default': '',
        'information': 'tooltip__information',
        'success': 'tooltip__success',
        'warning': 'tooltip__warning',
        'danger': 'tooltip__danger'
      },
      _positions = {
        T: 'T',
        TR: 'TR',
        R: 'R',
        BR: 'BR',
        B: 'B',
        BL: 'BL',
        L: 'L',
        TL: 'TL'
      },
      _positionMap = {
        'T': 'tooltip__top',
        'TR': 'tooltip__topright',
        'R': 'tooltip__right',
        'BR': 'tooltip__bottomright',
        'B': 'tooltip__bottom',
        'BL': 'tooltip__bottomleft',
        'L': 'tooltip__left',
        'TL': 'tooltip__topleft'
      },
      _mountPoint,
      _template = require('nudoru.utils.NTemplate'),
      _domUtils = require('nudoru.utils.DOMUtils'),
      _componentUtils = require('nudoru.components.ComponentViewUtils');

    function initialize(elID) {
      _mountPoint = document.getElementById(elID);
    }

    //obj.title, obj.content, obj.type, obj.target, obj.position
    function add(initObj) {
      initObj.type = initObj.type || _types.DEFAULT;

      var tooltipObj = createToolTipObject(initObj.title,
        initObj.content,
        initObj.position,
        initObj.targetEl);

      _children.push(tooltipObj);
      _mountPoint.appendChild(tooltipObj.element);

      tooltipObj.arrowEl = tooltipObj.element.querySelector('.arrow');
      assignTypeClassToElement(initObj.type, initObj.position, tooltipObj.element);

      _componentUtils.apply3DToContainer(_mountPoint);
      _componentUtils.apply3DToComponentElement(tooltipObj.element);

      TweenLite.set(tooltipObj.element, {
        css: {
          autoAlpha: 0,
          width: initObj.width ? initObj.width : _defaultWidth
        }
      });

      // cache these values, 3d transforms will alter size
      tooltipObj.width = tooltipObj.element.getBoundingClientRect().width;
      tooltipObj.height = tooltipObj.element.getBoundingClientRect().height;

      // set 3d rotation
      TweenLite.set(tooltipObj.element, {
        css: { rotationX:  _endRotationTransform}
      });

      assignEventsToTargetEl(tooltipObj);
      positionToolTip(tooltipObj);

      if(tooltipObj.position === _positions.L || tooltipObj.position === _positions.R) {
        centerArrowVertically(tooltipObj)
      }

      if(tooltipObj.position === _positions.T || tooltipObj.position === _positions.B) {
        centerArrowHorizontally(tooltipObj)
      }

      return tooltipObj.id;
    }

    function assignTypeClassToElement(type, position, element) {
      if (type !== 'default') {
        _domUtils.addClass(element, _typeStyleMap[type]);
      }
      _domUtils.addClass(element, _positionMap[position]);
    }

    function createToolTipObject(title, message, position, target) {
      var id = 'js__tooltip-tooltipitem-' + (_counter++).toString(),
        obj = {
          id: id,
          position: position,
          targetEl: target,
          elOverStream: null,
          elOutStream: null,
          height: 0,
          width: 0,
          element: _template.asElement('template__component--tooltip', {
            id: id,
            title: title,
            message: message
          }),
          arrowEl: null
        };

      return obj;
    }

    function assignEventsToTargetEl(tooltipObj) {
      tooltipObj.elOverStream = Rx.Observable.fromEvent(tooltipObj.targetEl, 'mouseover')
        .subscribe(function (evt) {
          showToolTip(tooltipObj.id);
        });

      tooltipObj.elOutStream = Rx.Observable.fromEvent(tooltipObj.targetEl, 'mouseout')
        .subscribe(function (evt) {
          hideToolTip(tooltipObj.id);
        });
    }

    function showToolTip(id) {
      var tooltipObj = getObjByID(id);
      positionToolTip(tooltipObj);
      transitionIn(tooltipObj.element);
    }

    function positionToolTip(tooltipObj) {
      var gutter = 15,
          xPos = 0,
          yPos = 0,
          tOriginH = '50%',
          tOriginV = '50%',
          tgtProps = tooltipObj.targetEl.getBoundingClientRect();

      if(tooltipObj.position === _positions.TL) {
        xPos = tgtProps.left - tooltipObj.width;
        yPos = tgtProps.top - tooltipObj.height;
        tOriginH = '100%';
        tOriginV = '100%';
      } else if(tooltipObj.position === _positions.T) {
        xPos = tgtProps.left + ((tgtProps.width / 2) - (tooltipObj.width / 2));
        yPos = tgtProps.top - tooltipObj.height - gutter;
        tOriginH = '50%';
        tOriginV = '100%';
      } else if(tooltipObj.position === _positions.TR) {
        xPos = tgtProps.right;
        yPos = tgtProps.top - tooltipObj.height;
        tOriginH = '0%';
        tOriginV = '100%';
      } else if(tooltipObj.position === _positions.R) {
        xPos = tgtProps.right + gutter;
        yPos = tgtProps.top + ((tgtProps.height / 2) - (tooltipObj.height / 2));
        tOriginH = '0%';
        tOriginV = '50%';
      } else if(tooltipObj.position === _positions.BR) {
        xPos = tgtProps.right;
        yPos = tgtProps.bottom;
        tOriginH = '0%';
        tOriginV = '0%';
      } else if(tooltipObj.position === _positions.B) {
        xPos = tgtProps.left + ((tgtProps.width / 2) - (tooltipObj.width / 2));
        yPos = tgtProps.bottom + gutter;
        tOriginH = '50%';
        tOriginV = '0%';
      } else if(tooltipObj.position === _positions.BL) {
        xPos = tgtProps.left - tooltipObj.width;
        yPos = tgtProps.bottom;
        tOriginH = '100%';
        tOriginV = '0%';
      } else if(tooltipObj.position === _positions.L) {
        xPos = tgtProps.left - tooltipObj.width - gutter;
        yPos = tgtProps.top + ((tgtProps.height / 2) - (tooltipObj.height / 2));
        tOriginH = '100%';
        tOriginV = '50%';
      }



      TweenLite.set(tooltipObj.element, {x: xPos, y: yPos, transformOrigin: tOriginH+' '+tOriginV});
    }

    function centerArrowHorizontally(tooltipObj) {
      var arrowProps = tooltipObj.arrowEl.getBoundingClientRect();
      TweenLite.set(tooltipObj.arrowEl, {x: (tooltipObj.width/2)-(arrowProps.width/2) });
    }

    function centerArrowVertically(tooltipObj) {
      var arrowProps = tooltipObj.arrowEl.getBoundingClientRect();
      TweenLite.set(tooltipObj.arrowEl, {y: (tooltipObj.height/2)-(arrowProps.height/2)-2 });
    }

    function hideToolTip(id) {
      var tooltipObj = getObjByID(id);
      transitionOut(tooltipObj.element);
    }

    function transitionIn(el) {
      TweenLite.to(el,0.25, {autoAlpha: 1,
         rotationX: 0,
        scaleY: 1,
        ease: Circ.easeOut
      });
    }

    function transitionOut(el) {
      TweenLite.to(el, 0.5, {
         rotationX:  _endRotationTransform,
        autoAlpha: 0,
        scaleY: 1,
        ease: Circ.easeIn
      });
    }

    function remove(el) {
      //var idx = getObjIndexByID(id),
      //  tooltip;
      //
      //if (idx > -1) {
      //  tooltip = _children[idx];
      getObjByElement(el).forEach(function(tooltip) {
        tooltip.elOverStream.dispose();
        tooltip.elOutStream.dispose();

        _mountPoint.removeChild(tooltip.element);

        var idx = getObjIndexByID(tooltip.id);

        _children[idx] = null;
        _children.splice(idx, 1);
      });
    }

    function getObjByID(id) {
      return _children.filter(function(child) {
        return child.id === id;
      })[0];
    }

    function getObjIndexByID(id) {
      return _children.map(function(child) { return child.id; }).indexOf(id);
    }

    function getObjByElement(el) {
      return _children.filter(function(child) {
        return child.targetEl === el;
      });
    }

    exports.initialize = initialize;
    exports.add = add;
    exports.remove = remove;
    exports.type = function () {
      return _types
    };
    exports.position = function () {
      return _positions
    };

  });