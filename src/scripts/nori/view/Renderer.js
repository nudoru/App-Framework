/**
 * Utility to handle all subview DOM attachment tasks
 *
 * TODO - implement virutal-dom https://github.com/Matt-Esch/virtual-dom
 */

define('Nori.View.Renderer',
  function(require, module, exports) {

    var _appEvents = require('Nori.Events.AppEventCreator'),
      _appEventConstants = require('Nori.Events.AppEventConstants'),
      _dispatcher = require('Nori.Utils.Dispatcher'),
      _domUtils = require('Nudoru.Browser.DOMUtils');

    function initialize() {
      _dispatcher.subscribe(_appEventConstants.RENDER_VIEW, render)
    }

    function render(payload) {
      var targetSelector = payload.payload.target,
        html = payload.payload.html,
        domEl,
        mountPoint = document.querySelector(targetSelector),
        cb = payload.payload.callback;

      mountPoint.innerHTML = '';

      if(html) {
        domEl = _domUtils.HTMLStrToNode(html);
        mountPoint.appendChild(domEl);
      }

      // Send the created DOM element back to the caller
      if(cb) {
        cb(domEl);
      }

      _appEvents.viewRendered(targetSelector, payload.payload.id);
    }

    exports.initialize = initialize;

  });