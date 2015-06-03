(function () {

  var _browserInfo = require('nudoru.utils.BrowserInfo');

  if(_browserInfo.notSupported) {
    alert("Your browser is not supported! Please use IE 9+, Firefox, Chrome or Safari.");
  }

  // Initialize the window
  window.onload = function() {

    var _appEvents = require('Nori.Events.AppEvents'),
      _model,
      _view;

    // Create the application instance
    window.TT = Nori.create();

    // Create the view
    _view = Nori.extend(require('TT.TimeTrackerAppView'), require('Nori.View'));

    // Initialize app with the view
    TT.initialize({view:_view});

    // Commands
    TT.mapEventCommand(_appEvents.ROUTE_CHANGED, 'TT.RouteChangedCommand');

    // Default route
    TT.mapRouteView('/', 'Timecard', 'TT.View.TemplateSubView');

    // Other routes
    TT.mapRouteView('/controls', 'ControlsTesting', 'TT.View.ControlsTestingSubView');
    TT.mapRouteView('/test', 'TestSubView', 'TT.View.TemplateSubView');
    TT.mapRouteView('/one', 'TestSubView1', 'TT.View.TemplateSubView');
    TT.mapRouteView('/two', 'TestSubView2', 'TT.View.TemplateSubView');
    TT.mapRouteView('/three', 'TestSubView3', 'TT.View.TemplateSubView');

    // Timecard mock
    TT.mapRouteView('/Forecast', 'Forecast', 'TT.View.TemplateSubView');
    TT.mapRouteView('/Assignments', 'Assignments', 'TT.View.TemplateSubView');
    TT.mapRouteView('/Timecard', 'Timecard', 'TT.View.TemplateSubView');

    //var dataSource = require('TT.FakeData');
    //dataSource.initialize();

    // Model testing-
    testModel();



    // Everything is ready!
    TT.view().removeLoadingMessage();

    // Execute the route on the URL
    TT.setCurrentRoute(TT.router().getCurrentRoute());
  }

  function testModel() {
   var test1 = TT.createModel();
    test1.initialize({id: 'MockModel', store: {name: 'Matt', age: 37}, silent: false});


    var test2 = TT.createModel();
    test2.initialize({id: 'AnotherModel', store: {name: 'June', useid:'x1234', age: 27}, silent: false});

    console.log(test1.toJSON());
    console.log(test2.toJSON());

    TT.addModel(test1);
    TT.addModel(test2);


    TT.bindModelView('MockModel','Timecard');
    TT.bindModelView('MockModel','Assignments');
    TT.bindModelView('AnotherModel','Timecard');

    test1.set({last:'perkins'});


  }

}());