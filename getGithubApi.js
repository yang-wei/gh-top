var request = require('request'),
filterJSON = require('./filterJSON'),
updateDb = require('./updateDb');

function LatestAPI(url) {
   this.GH_API_ROOT = url + 'search/repositories?q=language:javascript&sort=stars&per_page=100';
   this.options = {
    //url: this.GH_API_ROOT, 
    headers: {
      'User-Agent': 'nodejs',
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

    var result = '';

    request
      .get(this.GH_API_ROOT, this.options)
      .on('error', function(err) {
        callback(err);
      })
      .on('response', function(response) {
        callback(response.statusCode);
      })
      .on('data', function(chunk) {
        result += chunk;
      })
      .on('end', function() {
        var data = JSON.parse(result);
        var items = filterJSON(data.items, pickJSON);
        updateDb(items, console.log);
      });

}

module.exports = LatestAPI; 
