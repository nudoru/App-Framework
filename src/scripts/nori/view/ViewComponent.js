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
          _DOMNode,
          _mountPoint,
          _children      = [],
          _isMounted     = false,
          _noriEvents    = require('nori/events/EventCreator');

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

        _isInitialized = true;
      }

      function defineEvents() {
        return undefined;
      }

      /**
       * Bind updates to the map ID to this view's update
       * @param mapIDorObj Object to subscribe to or ID. Should implement nori/model/MixinObservableModel
       */
      function bindMap(mapIDorObj) {
        var map;

        if (isObject(mapIDorObj)) {
          map = mapIDorObj;
        } else {
          map = Nori.model().getMap(mapIDorObj) || Nori.model().getMapCollection(mapIDorObj);
        }

        if (!map) {
          throw new Error('ViewComponent bindMap, map or mapcollection not found: ' + mapIDorObj);
        }

        if (!isFunction(map.subscribe)) {
          throw new Error('ViewComponent bindMap, map or mapcollection must be observable: ' + mapIDorObj);
        }

        map.subscribe(this.update.bind(this));
      }

      /**
       * Add a child
       * @param child
       */
      function addChild(child) {
        _children.push(child);
      }

      /**
       * Remove a child
       * @param child
       */
      function removeChild(child) {
        var idx = _children.indexOf(child);
        _children[idx].dispose();
        _children.splice(idx, 1);
      }

      /**
       * Before the wiew updates and a rerender occurs
       */
      function componentWillUpdate() {
        return undefined;
      }

      function update() {
        this.componentUpdate();
      }

      /**
       * Update state and rerender
       * @param dataObj
       * @returns {*}
       */
      function componentUpdate() {
        // make a copy of last state
        var currentState = this.getState();
        var nextState    = this.componentWillUpdate();

        if (this.shouldComponentUpdate(nextState)) {
          this.setState(nextState);
          _children.forEach(function updateChild(child) {
            child.update();
          });

          if (_isMounted) {
            if (this.shouldComponentRender(currentState)) {
              this.unmount();
              this.renderPipeline();
              this.mount();
            }
          }

          this.componentDidUpdate();
        }
      }

      function shouldComponentUpdate(nextState) {
        return existy(nextState);
      }

      /**
       * Determine if the view should rerender on update
       * @returns {boolean}
       */
      function shouldComponentRender(beforeUpdateState) {
        return !_.isEqual(beforeUpdateState, this.getState());
      }

      /**
       * After the view updates and a rerender occurred
       */
      function componentDidUpdate() {
        // stub
      }

      function componentWillRender() {
        // stub
      }

      function renderPipeline() {
        this.componentRender();
      }

      function render() {
        return _templateObj(this.getState());
      }

      /**
       * Render it, need to add it to a parent container, handled in higher level view
       * @returns {*}
       */
      function componentRender() {
        if (this.componentWillRender) {
          this.componentWillRender();
        }

        _children.forEach(function renderChild(child) {
          child.renderPipeline();
        });

        _html = this.render();

        if (this.componentDidRender) {
          this.componentDidRender();
        }
      }

      function componentDidRender() {
        // stub
      }

      /**
       * Call before it's been added to a view
       */
      function componentWillMount() {
        // stub
      }

      /**
       * Append it to a parent element
       * @param mountEl
       */
      function mount() {
        if (!_html) {
          throw new Error('Component ' + _id + ' cannot mount with no HTML. Call render() first?');
        }

        if (this.componentWillMount) {
          this.componentWillMount();
        }

        _isMounted = true;

        // Go out to the standard render function. DOM element is returned in callback
        _noriEvents.renderView(_mountPoint, _html, _id, onViewRendered.bind(this));
      }

      /**
       * Handler for the renderer module
       * @param domEl
       */
      function onViewRendered(domEl) {
        setDOMNode(domEl);
        // from the ViewMixinEventDelegator
        if (this.delegateEvents) {
          this.delegateEvents();
        }

        if (this.componentDidMount) {
          this.componentDidMount();
        }
      }

      /**
       * Call after it's been added to a view
       */
      function componentDidMount() {
        // stub
      }

      /**
       * Call when unloading and switching views
       */
      function componentWillUnmount() {
        // stub
      }

      function unmount() {
        this.componentWillUnmount();
        _isMounted = false;
        _noriEvents.renderView(_mountPoint, '', _id);

        // from the ViewMixinEventDelegator
        if (this.undelegateEvents) {
          this.undelegateEvents();
        }

        setDOMNode(null);
        this.componentDidUnmount();
      }

      function componentDidUnmount() {
        // stub
      }

      /**
       * Remove a view and cleanup
       */
      function dispose() {
        this.unmount();
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

      function getTemplate() {
        return _templateObj;
      }

      function setTemplate(html) {
        _templateObj = _.template(html);
      }

      function getDOMNode() {
        return _DOMNode;
      }

      function setDOMNode(el) {
        _DOMNode = el;
      }

      function getHTML() {
        return _html;
      }

      function setHTML(str) {
        _html = str;
      }

      function getChildren() {
        return _children.slice(0);
      }


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
        getHTML            : getHTML,
        setHTML            : setHTML,
        getDOMNode         : getDOMNode,
        setDOMNode         : setDOMNode,
        isMounted          : isMounted,

        bindMap              : bindMap,
        componentWillUpdate  : componentWillUpdate,
        shouldComponentUpdate: shouldComponentUpdate,
        componentUpdate      : componentUpdate,
        update               : update,
        componentDidUpdate   : componentDidUpdate,

        shouldComponentRender: shouldComponentRender,
        componentWillRender  : componentWillRender,
        renderPipeline       : renderPipeline,
        componentRender      : componentRender,
        render               : render,
        componentDidRender   : componentDidRender,

        componentWillMount: componentWillMount,
        mount             : mount,
        componentDidMount : componentDidMount,

        componentWillUnmount: componentWillUnmount,
        unmount             : unmount,
        componentDidUnmount : componentDidUnmount,

        addChild   : addChild,
        removeChild: removeChild,
        getChildren: getChildren
      };

    };

    module.exports = ViewComponent;

  });