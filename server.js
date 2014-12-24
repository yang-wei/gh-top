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
app.use('/public', express.static(__dirname + '/public'));

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 5000;

app.get('/', function(request, response, next) {
    ReactAsync.renderToStringAsync(App(), function(err, markup) {
      if(err) return next(err);
      response.send(markup);
    });
});
/*
app.use(function(request, response, next) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});  
*/
app.get('/api/repos/:lang', function(request, response, next){
  var language = request.params.lang;
  language = language == 'All' ? undefined : language;
  database(function(results) {
    response.json(results);
  }, language);
});

app.listen(port, ip, function() {
  console.log("Successfully connect to port " + port);
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
});

