import Rxjs from '../../vendor/rxjs/rx.lite.min.js';
import Template from '../../nori/view/Templating.js';
import ModalCover from './ModalCoverView.js';
import BrowserInfo from '../../nudoru/browser/BrowserInfo.js';
import DOMUtils from '../../nudoru/browser/DOMUtils.js';

let MessageBoxViewModule = function () {

  let _children               = [],
      _counter                = 0,
      _highestZ               = 1000,
      _defaultWidth           = 400,
      _types                  = {
        DEFAULT    : 'default',
        INFORMATION: 'information',
        SUCCESS    : 'success',
        WARNING    : 'warning',
        DANGER     : 'danger'
      },
      _typeStyleMap           = {
        'default'    : '',
        'information': 'messagebox__information',
        'success'    : 'messagebox__success',
        'warning'    : 'messagebox__warning',
        'danger'     : 'messagebox__danger'
      },
      _mountPoint,
      _buttonIconTemplateID   = 'messagebox--button-icon',
      _buttonNoIconTemplateID = 'messagebox--button-noicon';

  /**
   * Initialize and set the mount point / box container
   * @param elID
   */
  function initialize(elID) {
    _mountPoint = document.getElementById(elID);
    defineTemplates();
  }

  function defineTemplates() {
    Template.addTemplate('messagebox--default', `<div class="messagebox__default" id="{{ id }}">
        <div class="header" id="{{ id }}-header">
             <h1>{{ title }}</h1>
        </div>
        <div class="content">
             {{{ content }}}
        </div>
        <div class="footer">
            <div class="footer-buttons">
                <div class="button" id="{{ id }}-button-close">
                    <button>Close</button>
                </div>
            </div>
        </div>
    </div>`);
    Template.addTemplate('messagebox--button-noicon', `<div class="button {{ type }}" id="{{ id }}">
        <button>{{ label }}</button>
    </div>`);
    Template.addTemplate('messagebox--button-icon', `<div class="button icon-left {{ type }}" id="{{ id }}">
        <button><i class="fa fa-{{ icon }}"></i>{{ label }}</button>
    </div>`);
  }

  /**
   * Add a new message box
   * @param initObj
   * @returns {*}
   */
  function add(initObj) {
    let type   = initObj.type || _types.DEFAULT,
        boxObj = createBoxObject(initObj);

    // setup
    _children.push(boxObj);
    _mountPoint.appendChild(boxObj.element);
    assignTypeClassToElement(type, boxObj.element);
    configureButtons(boxObj);

    TweenLite.set(boxObj.element, {
      css: {
        zIndex: _highestZ,
        width : initObj.width ? initObj.width : _defaultWidth
      }
    });

    // center after width has been set
    DOMUtils.centerElementInViewPort(boxObj.element);

    // Make it draggable
    Draggable.create('#' + boxObj.id, {
      bounds : window,
      onPress: function () {
        _highestZ = Draggable.zIndex;
      }
    });

    // Show it
    transitionIn(boxObj.element);

    // Show the modal cover
    if (initObj.modal) {
      ModalCover.showNonDismissable(true);
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
      DOMUtils.addClass(element, _typeStyleMap[type]);
    }
  }

  /**
   * Create the object for a box
   * @param initObj
   * @returns {{dataObj: *, id: string, modal: (*|boolean), element: *, streams: Array}}
   */
  function createBoxObject(initObj) {
    var id  = 'js__messagebox-' + (_counter++).toString(),
        obj = {
          dataObj: initObj,
          id     : id,
          modal  : initObj.modal,
          element: Template.asElement('messagebox--default', {
            id     : id,
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
    let buttonData = boxObj.dataObj.buttons;

    // default button if none
    if (!buttonData) {
      buttonData = [{
        label: 'Close',
        type : '',
        icon : 'times',
        id   : 'default-close'
      }];
    }

    let buttonContainer = boxObj.element.querySelector('.footer-buttons');

    DOMUtils.removeAllElements(buttonContainer);

    buttonData.forEach(function makeButton(buttonObj) {
      buttonObj.id = boxObj.id + '-button-' + buttonObj.id;

      let buttonEl;

      if (buttonObj.hasOwnProperty('icon')) {
        buttonEl = Template.asElement(_buttonIconTemplateID, buttonObj);
      } else {
        buttonEl = Template.asElement(_buttonNoIconTemplateID, buttonObj);
      }

      buttonContainer.appendChild(buttonEl);

      let btnStream = Rxjs.Observable.fromEvent(buttonEl, BrowserInfo.mouseClickEvtStr())
        .subscribe(function () {
          if (buttonObj.hasOwnProperty('onClick')) {
            if (buttonObj.onClick) {
              buttonObj.onClick.call(this, captureFormData(boxObj.id));
            }
          }
          remove(boxObj.id);
        });
      boxObj.streams.push(btnStream);
    });

  }

  /**
   * Returns data from the form on the box contents
   * @param boxID
   * @returns {*}
   */
  function captureFormData(boxID) {
    return DOMUtils.captureFormData(getObjByID(boxID).element);
  }

  /**
   * Remove a box from the screen / container
   * @param id
   */
  function remove(id) {
    let idx = getObjIndexByID(id),
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
    TweenLite.to(el, 0, {alpha: 0, scale: 1.25});
    TweenLite.to(el, 0.5, {
      alpha: 1,
      scale: 1,
      ease : Circ.easeOut
    });
  }

  /**
   * Remove the box
   * @param el
   */
  function transitionOut(el) {
    TweenLite.to(el, 0.25, {
      alpha: 0,
      scale: 0.75,
      ease : Circ.easeIn, onComplete: function () {
        onTransitionOutComplete(el);
      }
    });
  }

  /**
   * Clean up after the transition out animation
   * @param el
   */
  function onTransitionOutComplete(el) {
    let idx    = getObjIndexByID(el.getAttribute('id')),
        boxObj = _children[idx];

    boxObj.streams.forEach(function (stream) {
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
    let isModal = false;

    _children.forEach(function (boxObj) {
      if (boxObj.modal === true) {
        isModal = true;
      }
    });

    if (!isModal) {
      ModalCover.hide(true);
    }
  }

  /**
   * Utility to get the box object index by ID
   * @param id
   * @returns {number}
   */
  function getObjIndexByID(id) {
    return _children.map(function (child) {
      return child.id;
    }).indexOf(id);
  }

  /**
   * Utility to get the box object by ID
   * @param id
   * @returns {number}
   */
  function getObjByID(id) {
    return _children.filter(function (child) {
      return child.id === id;
    })[0];
  }

  function getTypes() {
    return _types;
  }

  return {
    initialize: initialize,
    add       : add,
    remove    : remove,
    type      : getTypes
  };

};

let MessageBoxView = MessageBoxViewModule();

export default MessageBoxView;