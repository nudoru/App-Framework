/**
 * Base module for components
 * Must be extended with custom modules
 */

define('nori/view/ViewComponent',
  function (require, module, exports) {

    var ViewComponent = function () {

      var _isInitialized = false,
          _configProps,
          _id,
          _templateObj,
          _html,
          _DOMElement,
          _mountPoint,
          _children      = [],
          _isMounted     = false,
          _renderer      = require('nori/utils/Renderer');

      /**
       * Initialization
       * @param configProps
       */
      function initializeComponent(configProps) {
        _configProps = configProps;
        _id          = configProps.id;
        _templateObj = configProps.template;
        _mountPoint  = configProps.mountPoint;

        this.setState(this.getInitialState());
        this.setEvents(this.defineEvents());

        this.createSubject('update');
        this.createSubject('mount');
        this.createSubject('unmount');

        _isInitialized = true;
      }

      function defineEvents() {
        return undefined;
      }

      /**
       * Bind updates to the map ID to this view's update
       * @param mapIDorObj Object to subscribe to or ID. Should implement nori/store/MixinObservableStore
       */
      function bindMap(mapIDorObj) {
        var map;

        if (is.object(mapIDorObj)) {
          map = mapIDorObj;
        } else {
          map = Nori.store().getMap(mapIDorObj) || Nori.store().getMapCollection(mapIDorObj);
        }

        if (!map) {
          console.warn('ViewComponent bindMap, map or mapcollection not found: ' + mapIDorObj);
          return;
        }

        if (!is.function(map.subscribe)) {
          console.warn('ViewComponent bindMap, map or mapcollection must be observable: ' + mapIDorObj);
          return;
        }

        map.subscribe(this.update.bind(this));
      }

      /**
       * Add a child
       * @param child
       */
      //function addChild(child) {
      //  _children.push(child);
      //}

      /**
       * Remove a child
       * @param child
       */
      //function removeChild(child) {
      //  var idx = _children.indexOf(child);
      //  _children[idx].unmount();
      //  _children.splice(idx, 1);
      //}

      /**
       * Before the view updates and a rerender occurs
       * Returns nextState of component
       */
      function componentWillUpdate() {
        return this.getState();
      }

      function update() {
        var currentState = this.getState();
        var nextState    = this.componentWillUpdate();

        if (this.shouldComponentUpdate(nextState)) {
          this.setState(nextState);
          //_children.forEach(function updateChild(child) {
          //  child.update();
          //});

          if (_isMounted) {
            if (this.shouldComponentRender(currentState)) {
              this.unmount();
              this.componentRender();
              this.mount();
            }
          }
          this.notifySubscribersOf('update', this.getID());
        }
      }

      /**
       * Compare current state and next state to determine if updating should occur
       * @param nextState
       * @returns {*}
       */
      function shouldComponentUpdate(nextState) {
        return is.existy(nextState);
      }

      /**
       * Render it, need to add it to a parent container, handled in higher level view
       * @returns {*}
       */
      function componentRender() {
        //_children.forEach(function renderChild(child) {
        //  child.componentRender();
        //});

        _html = this.render(this.getState());

      }

      /**
       * May be overridden in a submodule for custom rendering
       * Should return HTML
       * @returns {*}
       */
      function render(state) {
        return _templateObj(state);
      }

      /**
       * Append it to a parent element
       * @param mountEl
       */
      function mount() {
        if (!_html) {
          throw new Error('Component ' + _id + ' cannot mount with no HTML. Call render() first?');
        }

        _isMounted = true;

        _DOMElement = (_renderer.render({
          target: _mountPoint,
          html  : _html
        }));

        if (this.delegateEvents) {
          this.delegateEvents();
        }

        if (this.componentDidMount) {
          this.componentDidMount();
        }

        this.notifySubscribersOf('mount', this.getID());
      }

      /**
       * Call after it's been added to a view
       */
      function componentDidMount() {
        // stub
      }

      /**
       * Call when unloading
       */
      function componentWillUnmount() {
        // stub
      }

      function unmount() {
        this.componentWillUnmount();
        _isMounted = false;

        if (this.undelegateEvents) {
          this.undelegateEvents();
        }

        _renderer.render({
          target: _mountPoint,
          html  : ''
        });

        _html       = '';
        _DOMElement = null;
        this.notifySubscribersOf('unmount', this.getID());
      }

      //----------------------------------------------------------------------------
      //  Accessors
      //----------------------------------------------------------------------------

      function isInitialized() {
        return _isInitialized;
      }

      function getConfigProps() {
        return _configProps;
      }

      function isMounted() {
        return _isMounted;
      }

      function getInitialState() {
        this.setState({});
      }

      function getID() {
        return _id;
      }

      function getDOMElement() {
        return _DOMElement;
      }

      function getTemplate() {
        return _templateObj;
      }

      function setTemplate(html) {
        _templateObj = _.template(html);
      }

      //function getChildren() {
      //  return _children.slice(0);
      //}


      //----------------------------------------------------------------------------
      //  API
      //----------------------------------------------------------------------------

      return {
        initializeComponent: initializeComponent,
        defineEvents       : defineEvents,
        isInitialized      : isInitialized,
        getConfigProps     : getConfigProps,
        getInitialState    : getInitialState,
        getID              : getID,
        getTemplate        : getTemplate,
        setTemplate        : setTemplate,
        getDOMElement      : getDOMElement,
        isMounted          : isMounted,

        bindMap: bindMap,

        componentWillUpdate  : componentWillUpdate,
        shouldComponentUpdate: shouldComponentUpdate,
        update               : update,

        componentRender: componentRender,
        render         : render,

        mount            : mount,
        componentDidMount: componentDidMount,

        componentWillUnmount: componentWillUnmount,
        unmount             : unmount

        //addChild   : addChild,
        //removeChild: removeChild,
        //getChildren: getChildren
      };

    };

    module.exports = ViewComponent;

  });