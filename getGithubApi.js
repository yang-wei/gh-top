var request = require('request'),
filterJSON = require('./filterJSON'),
updateDb = require('./updateDb');

function LatestAPI(url) {
   this.GH_API_ROOT = url;
   this.options = {
    url: this.GH_API_ROOT + 'search/repositories?q=language:javascript&per_page=5', 
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

    request(this.options, function(error, response, body) {
      if(error) { callback(error) }
      if(!error && response.statusCode === 200) {
        var result = JSON.parse(body);
        var items = filterJSON(result.items, pickJSON);
        updateDb(items, console.log);
        callback(null, response); 
      }
    });
}

module.exports = LatestAPI; 
