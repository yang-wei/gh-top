var mongoskin = require('mongoskin');

var mongodb_connection_string = 'mongodb://@localhost:27017/repos';
if(process.env.OPENSHIFT_MONGODB_DB_URL) {
  mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + '/' + process.env.OPENSHIFT_MONGODB_DB_USERNAME;
}
var db = mongoskin.db(mongodb_connection_string, {safe:true});

module.exports = function(cb, lang) {
  var query = {};
  if(lang) {
    query.language = lang; 
  }
  db.collection('repos').find(query).sort({stars: -1}).limit(100).toArray(function(e, results) {
    if(e) console.log(e);
    cb(results);
  })
}
