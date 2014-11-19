'use strict';

var mongoskin = require('mongoskin');

var db = mongoskin.db('mongodb://@localhost:27017/repos', {safe:true});

module.exports = updateDb;

function updateDb(items, callback) {
  db.collection('repos').remove({}, function(e, nRemoved) {
    var oldItemNum = nRemoved;
    if(e) callback(e.messages);
    db.collection('repos').insert(items, {}, function(e, newItem) {
      callback("Deleted " + oldItemNum + " item and inserted " + newItem.length + " repos at " + new Date());
      process.exit(0);
    });
  });
}

