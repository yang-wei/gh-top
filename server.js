'use strict';
var express =require('express'),
    mongoskin = require('mongoskin'),
    bodyParser = require('body-parser'),
    LatestAPI = require('./getGithubApi')
    ;

var app = express();

app.use(bodyParser.json());

var db = mongoskin.db('mongodb://@localhost:27017/repos', {safe:true});

var port = 3000;
var gh_url = 'https://api.github.com/'

app.get('/', function(request, response) {
  response.send("Hello world");
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
  initAPI.fetchAPI(function(response) {
    if(response) {
      console.log("Data initialization done.") 
    }
  });

  var API = new LatestAPI(gh_url);
  var interval = 3600*1000;
  (function schedule() {
    setTimeout(function() {
      API.fetchAPI(function(response) {
        if(response) 
          schedule();
      });
    }, interval);
  })();

});


