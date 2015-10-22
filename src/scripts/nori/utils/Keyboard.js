/* @flow weak */

/**
 * Maps keyboard presses to a handler function
 * Dependencies: RxJS
 *
 * TODO Implement modifiers
 *
 * Example
 var Keyboard = require('./nori/utils/Keyboard'),
 kb = Keyboard();
 kb.initialize();
 kb.mapKey(['a','b'],function(key){
          console.log('Pressed: '+key);
          kb.unmapKey(['b']);
        });
 */

import Rxjs from '../../vendor/rxjs/rx.lite.min.js';
import _ from '../../vendor/lodash.min.js';

let Keyboard = function () {

  let _callbackMap = {},
      _subscription,
      _keyCodes    = {
        'backspace'       : '8',
        'tab'             : '9',
        'enter'           : '13',
        'shift'           : '16',
        'ctrl'            : '17',
        'alt'             : '18',
        'pause_break'     : '19',
        'caps_lock'       : '20',
        'escape'          : '27',
        'page_up'         : '33',
        'page down'       : '34',
        'end'             : '35',
        'home'            : '36',
        'left'            : '37',
        'up'              : '38',
        'right'           : '39',
        'down'            : '40',
        'insert'          : '45',
        'delete'          : '46',
        '0'               : '48',
        '1'               : '49',
        '2'               : '50',
        '3'               : '51',
        '4'               : '52',
        '5'               : '53',
        '6'               : '54',
        '7'               : '55',
        '8'               : '56',
        '9'               : '57',
        'a'               : '65',
        'b'               : '66',
        'c'               : '67',
        'd'               : '68',
        'e'               : '69',
        'f'               : '70',
        'g'               : '71',
        'h'               : '72',
        'i'               : '73',
        'j'               : '74',
        'k'               : '75',
        'l'               : '76',
        'm'               : '77',
        'n'               : '78',
        'o'               : '79',
        'p'               : '80',
        'q'               : '81',
        'r'               : '82',
        's'               : '83',
        't'               : '84',
        'u'               : '85',
        'v'               : '86',
        'w'               : '87',
        'x'               : '88',
        'y'               : '89',
        'z'               : '90',
        'left_window key' : '91',
        'right_window key': '92',
        'select_key'      : '93',
        'numpad 0'        : '96',
        'numpad 1'        : '97',
        'numpad 2'        : '98',
        'numpad 3'        : '99',
        'numpad 4'        : '100',
        'numpad 5'        : '101',
        'numpad 6'        : '102',
        'numpad 7'        : '103',
        'numpad 8'        : '104',
        'numpad 9'        : '105',
        'multiply'        : '106',
        'add'             : '107',
        'subtract'        : '109',
        'decimal point'   : '110',
        'divide'          : '111',
        'f1'              : '112',
        'f2'              : '113',
        'f3'              : '114',
        'f4'              : '115',
        'f5'              : '116',
        'f6'              : '117',
        'f7'              : '118',
        'f8'              : '119',
        'f9'              : '120',
        'f10'             : '121',
        'f11'             : '122',
        'f12'             : '123',
        'num_lock'        : '144',
        'scroll_lock'     : '145',
        'semi_colon'      : '186',
        'equal_sign'      : '187',
        'comma'           : '188',
        'dash'            : '189',
        'period'          : '190',
        'forward_slash'   : '191',
        'grave_accent'    : '192',
        'open_bracket'    : '219',
        'backslash'       : '220',
        'closebracket'    : '221',
        'single_quote'    : '222'
      };

  /**
   * Initialize
   * @param context On which element to listen for key preses on
   * @param evt 'keydown' or 'keyup'
   */
  function initialize(context, evt) {

    context = context || document;
    evt     = evt || 'keydown';

    var source = Rxjs.Observable.fromEvent(context, evt);

    _subscription = source.map(function (evt) {
      return evt.keyCode;
    }).map(function (code) {
      return getKeyNameFromCode(code);
    }).subscribe(handleKeyDown);

  }

  /**
   * Returns the keymap
   * @returns {void|*}
   */
  function getKeyCodes() {
    return _.assign({}, _keyCodes);
  }

  /**
   * Determines if the key is present in the map
   * @param key
   * @returns {boolean}
   */
  function isValid(key) {
    return _keyCodes.hasOwnProperty(key);
  }

  /**
   * Maps a string key or array to callback function
   * @param key string or array
   * @param callback function to execute when pressed
   * @param context scope to execute
   */
  function mapKey(key, callback, context) {
    if (typeof key === 'string') {
      key = [key];
    }

    key.forEach(function (k) {
      addKeyCallBack(k, callback, context);
    });
  }

  function addKeyCallBack(key, callback, context) {
    if (isValid(key)) {
      context           = context || window;
      _callbackMap[key] = callback.bind(context);
    }
  }

  /**
   * Removes a mapping
   * @param key string or array
   */
  function unmapKey(key) {
    if (typeof key === 'string') {
      key = [key];
    }

    key.forEach(function (k) {
      removeKeyCallBack(k);
    });
  }

  function removeKeyCallBack(key) {
    delete _callbackMap[key];
  }

  /**
   * Execute the callback for a key
   * @param code
   */
  function handleKeyDown(code) {
    if (_callbackMap.hasOwnProperty(code)) {
      _callbackMap[code](code);
    }
  }

  /**
   * Gets the name for the key from the key map
   * @param code
   * @returns {*}
   */
  function getKeyNameFromCode(code) {
    for (var keyname in _keyCodes) {
      if (_keyCodes[keyname] === ('' + code)) {
        return keyname;
      }
    }
    return undefined;
  }

  function dispose() {
    _callbackMap = undefined;
    _subscription.dispose();
  }

  return {
    initialize : initialize,
    getKeyCodes: getKeyCodes,
    mapKey     : mapKey,
    unmapKey   : unmapKey,
    dispose    : dispose
  };

};

export default Keyboard;
