/**
 * Starting point for an Express/CRUD app
 */

var express    = require('express'),
    bodyParser = require('body-parser'),
    logger     = require('morgan'),
    path       = require('path'),
    app        = express(),
    router     = express.Router(),
    jsonParser = bodyParser.json();

//----------------------------------------------------------------------------
//  Middleware
//----------------------------------------------------------------------------

app.use(logger('dev'));
app.use(express.static('bin'));

//----------------------------------------------------------------------------
//  CRUD routes
//----------------------------------------------------------------------------

app.get('/items/', function (req, res) {
  res.json({data: 'w00t!', method: 'get'});
});

app.post('/items', jsonParser, function (req, res) {
  if (!req.body) {
    return res.sendStatus(400);
  }

  res.status(201).json({data: 'w00t!', method: 'post'});
});

app.put('/items/:id', jsonParser, function (req, res) {
  if (!req.body) {
    return res.sendStatus(400);
  }
  res.status(200).json({data: 'w00t!', method: 'put', id: req.params.id});
});

app.delete('/items/:id', jsonParser, function (req, res) {
  if (true) {
    res.status(200).json({data: 'w00t!', method: 'delete', id: req.params.id});
  } else {
    res.status(500).send({error: 'No item with id: ' + req.params.id});
  }
});

//----------------------------------------------------------------------------
//  Errors
//----------------------------------------------------------------------------

// error handlers
// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
  var err    = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error  : err
    });
  });
}

// production error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error  : {}
  });
});

//----------------------------------------------------------------------------
//
//----------------------------------------------------------------------------

app.listen(process.env.PORT || 8080);

module.exports = app;