# Views

GridCollectionView
GridElementView

Collections
  GridCollection
  DDMenuBar, DDMenu
  TagBar
  ToastNotification

## CollectionContainer
  - mount point
  - initialize - set data
  - update data - update item viz based on data
  - render - create container
    - build children
  - postRender / after mount
  - append child
  - prepend child
  - show
  - hide
  - toggle vis
  - select
  - deselect
  - toggle sections
  - remove one
  - remove all
  - getNumChildren
  - get num children visible
  - get element by id

### Collection Element
  - mount point
  - initialize set data
  - update data - rerender
  - render - create element
  - postRender / after mount
  - show
  - hide
  - toggle vis
  - select
  - deselect
  - toggle section
  - remove


# template

define('...',
  function(require, module, exports) {
  });

APP.AppController.initializeCommand('APP.AppController.',
  function execute(data) {

# Module IDs

nudoru.events.BrowserEvents
nudoru.events.ComponentEvents
nudoru.utils.ArrayUtils
nudoru.utils.DOMUtils
nudoru.utils.NumberUtils
nudoru.utils.ObjectUtils
nudoru.utils.StringUtils
nudoru.utils.TouchUtils
nudoru.utils.NLorem
nudoru.utils.NTemplate
nudoru.utils.URLRouter
nudoru.components.FloatImageView
nudoru.components.ModalCoverView
nudoru.components.ToastView
nudoru.events.EventDispatcher
nudoru.events.EventCommandMap
nudoru.utils.BrowserInfo

# Vars

_browserInfo = require('nudoru.utils.BrowserInfo');
_URLRouter = require('nudoru.utils.URLRouter');
_template = require('nudoru.utils.NTemplate');
_lorem = require('nudoru.utils.NLorem');
_browserEvents = require('nudoru.events.BrowserEvents');
_componentEvents = require('nudoru.events.ComponentEvents');
_arrayUtils = require('nudoru.utils.ArrayUtils');
_DOMUtils = require('nudoru.utils.DOMUtils');
_numberUtils = require('nudoru.utils.NumberUtils');
_objectUtils = require('nudoru.utils.ObjectUtils');
_stringUtils = require('nudoru.utils.StringUtils');
_touchUtils = require('nudoru.utils.TouchUtils');