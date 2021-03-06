var request = require('request'),
languages = require('./languages').slice(1),
async = require('async'),
filterJSON = require('./filterJson'),
updateDb = require('./updateDB');


function LatestAPI() {
   this.options = {
    //url: this.GH_API_ROOT, 
    headers: {
      'User-Agent': 'yang-wei',
      'Content-type': 'application/json',
      'Accept': 'application/vnd.github.v3+json'
    }
  };
}

LatestAPI.prototype.fetchAPI = function(callback) {
    var pickJSON = {
      gh_id: 'id',
      name: 'name',
      full_name: 'full_name',
      owner: 'owner.login',
      avatar_url: 'owner.avatar_url',
      url: 'html_url',
      description: 'description',
      stars: 'stargazers_count',
      watchers: 'watchers_count',
      forks: 'forks',
      language: 'language'
    }; 

    function query(language) {
      return 'search/repositories?q=language:' + language + '&sort=stars&per_page=100';
    }
    // top 15 on githut.info on Dec 2014
    var gh_url = 'https://api.github.com/'
    var result = '', endpoint = '';
    var completed_request = 0;

   function makeRequest(lang, cb) {
      var chunk;
      endpoint = gh_url + query(lang.search);
      setTimeout(function() {
      
      request({
        method: 'GET',
        uri: endpoint,
        headers: {
          'User-Agent': 'yang-wei',
          'Content-type': 'application/json',
          'Accept': 'application/vnd.github.v3+json'
        }
      }, function(err, response, body) {
        if(err) {
          console.log(err)
        } else {
          // TODO: blocking code
          var data = JSON.parse(body);
          var items = filterJSON(data.items, pickJSON);
          /*  
           * Github Search Api Rate Limit is 5 requests per minute
           * https://developer.github.com/v3/search/#rate-limit 
          */
          cb(err, items);
        }
      })

      }, 13000)
     }

    async.mapSeries(languages, makeRequest, function(err, results) {
     if(err) console.log(err); 
     var repos = [];
     var allRepos = results.reduce(function(x,y) {
        return x.concat(y); 
     });
      updateDb(allRepos, console.log);
    });

}

module.exports = LatestAPI; 
