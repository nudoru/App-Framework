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

        _isInitialized = true;
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
       * Before the iew updates and a rerender occurs
       */
      function componentWillUpdate() {
        // update state
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
        var previousState = _.assign({}, this.getState());

        // state will update here
        this.componentWillUpdate();

        _children.forEach(function updateChild(child) {
          child.update();
        });

        if (_isMounted) {
          if (this.componentShouldRender(previousState)) {
            this.unmount();
            this.renderPipeline();
            this.mount();
          }
        }

        this.componentDidUpdate();
      }

      /**
       * Determine if the view should rerender on update
       * TODO implement
       * @returns {boolean}
       */
      function componentShouldRender(previousState) {
        return !_.isEqual(previousState, this.getState());
        //return true;
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
        //this.componentRender();
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

        //_html = _templateObj(this.getState());
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
          throw new Error('Component ' + _id + ' cannot mount with no HTML. Call render() first');
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

        isInitialized  : isInitialized,
        getConfigProps : getConfigProps,
        getInitialState: getInitialState,
        getID          : getID,
        getTemplate    : getTemplate,
        getHTML        : getHTML,
        setHTML        : setHTML,
        getDOMNode     : getDOMNode,
        setDOMNode     : setDOMNode,
        isMounted      : isMounted,

        bindMap            : bindMap,
        componentWillUpdate: componentWillUpdate,
        update             : update,
        componentUpdate    : componentUpdate,
        componentDidUpdate : componentDidUpdate,

        componentShouldRender: componentShouldRender,
        componentWillRender  : componentWillRender,
        renderPipeline       : renderPipeline,
        render               : render,
        componentRender      : componentRender,
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