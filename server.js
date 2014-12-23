'use strict';
var express =require('express'),
    mongoskin = require('mongoskin'),
    bodyParser = require('body-parser'),
    LatestAPI = require('./getGithubApi'),
    ReactAsync = require('react-async'),
    nodejsx = require('node-jsx').install(),
    database = require('./database'),
    App = require('./client')
    ;

var app = express();

app.use(bodyParser.json());
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/public', express.static(__dirname + '/public'));

var db = mongoskin.db('mongodb://@localhost:27017/repos', {safe:true});

var port = 5000;

app.get('/', function(request, response, next) {
    ReactAsync.renderToStringAsync(App(), function(err, markup) {
      if(err) return next(err);
      response.send(markup);
    });
});

app.get('/api/repos', function(request, response, next){
  database(function(results) {
    response.json(results);
  });
});

app.get('/api/repos/:lang', function(request, response, next){
  database(function(results) {
    response.json(results);
  }, request.params.lang);
});

app.listen(port, function() {
  console.log("Successfully connect to port " + port);
  /*
  var initAPI = new LatestAPI();
  initAPI.fetchAPI(function(error, response) {
    if(error) { console.error(error); }
    if(response) {
      console.log("Data initialization done.") 
    }
  });

  var API = new LatestAPI();
  // set interval to an hour
  var interval = 3600*1000;
  (function schedule() {
    setTimeout(function() {
      API.fetchAPI(function(error, response) {
        if(error) { console.error(error); }
        if(response) 
          schedule();
      });
    }, interval);
  })();
  */
});

