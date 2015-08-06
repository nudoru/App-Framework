var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

app.use(express.static('bin'));

app.get('/items/', function (req, res) {
  console.log('get', req.body);
  res.json({data: 'w00t!', method: 'get'});
});

app.post('/items', jsonParser, function (req, res) {
  console.log('post', req.body);

  if (!req.body) {
    return res.sendStatus(400);
  }

  res.status(201).json({data: 'w00t!', method: 'post'});
});

app.put('/items/:id', jsonParser, function (req, res) {
  console.log('put',req.body);

  if (!req.body) {
    return res.sendStatus(400);
  }
  res.status(200).json({data: 'w00t!', method: 'put', id: req.params.id});
});

app.delete('/items/:id', jsonParser, function (req, res) {
  console.log('delete');
  if (true) {
    res.status(200).json({data: 'w00t!', method: 'delete', id: req.params.id});
  } else {
    res.status(500).send({error: 'No item with id: ' + req.params.id});
  }

});

app.listen(process.env.PORT || 8080);