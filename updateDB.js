'use strict';

var mongoskin = require('mongoskin');
var collection_name = 'repos';
var mongodb_connection_string = 'mongodb://@localhost:27017/' + collection_name;
if(process.env.OPENSHIFT_MONGODB_DB_URL) {
  mongodb_connection_string = 'mongodb://' + process.env.OPENSHIFT_MONGODB_DB_USERNAME + ':' + process.env.OPENSHIFT_MONGODB_DB_PASSWORD + '@'  + process.env.OPENSHIFT_MONGODB_DB_URL + '/' + process.env.OPENSHIFT_APP_NAME;
}
var db = mongoskin.db(mongodb_connection_string, {safe:true});

function updateDb(items, callback) {
  db.collection('repos').remove({}, function(e, nRemoved) {
    var oldItemNum = nRemoved;
    if(e) callback(e.messages);
    db.collection('repos').insert(items, {}, function(e, newItem) {
      callback("Deleted " + oldItemNum + " item and inserted " + newItem.length + " repos at " + new Date());
    });
  });
}

module.exports = updateDb;
