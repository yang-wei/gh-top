'use strict';

var express =require('express'),
    mongoskin = require('mongoskin'),
    bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

var db = mongoskin.db('mongodb://@localhost:27017/repos', {safe:true});

app.get('/', function(request, response) {
  response.send("Hello world");
});

app.get('/repos', function(request, response, next){
  db.collection('repos').find({}).toArray(function(e, results){
    if(e) return next(e);
    response.send(results);
  }) 
})

app.listen(3000);
