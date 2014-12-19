var mongoskin = require('mongoskin');
var db = mongoskin.db('mongodb://@localhost:27017/repos', {safe:true});
var query = {};

module.exports = function(cb, lang) {
  if(lang) {
    query.language = lang; 
  }
  db.collection('repos').find(query).toArray(function(e, results) {
    if(e) console.log(e);
    cb(results);
  })
}
