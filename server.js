'use strict';
var express =require('express'),
    mongoskin = require('mongoskin'),
    bodyParser = require('body-parser'),
    LatestAPI = require('./getGithubApi'),
    ReactAsync = require('react-async'),
    nodejsx = require('node-jsx').install(),
    App = require('./client')
    ;

var app = express();

app.use(bodyParser.json());
app.use('/bower_components', express.static(__dirname + '/bower_components'));

var db = mongoskin.db('mongodb://@localhost:27017/repos', {safe:true});

var port = 5000;
var gh_url = 'https://api.github.com/'

app.get('/', function(request, response, next) {
  var app = App();
  ReactAsync.renderToStringAsync(app, function(err, markup) {
    if(err) return next(err);

    response.send("<!doctype html>\n" + markup );
  });
});

app.get('/api/repos', function(request, response, next){
  db.collection('repos').find({}).toArray(function(e, results){
    if(e) return next(e);
    response.json(results);
  }) 
});

app.listen(port, function() {
  console.log("Successfully connect to port " + port);
  var initAPI = new LatestAPI(gh_url);
  initAPI.fetchAPI(function(error, response) {
    if(error) { console.error(error); }
    if(response) {
      console.log("Data initialization done.") 
    }
  });

  var API = new LatestAPI(gh_url);
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

});


