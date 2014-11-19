var request = require('request'),
    filterJSON = require('./filterJSON'),
    updateDb = require('./updateDb');

var GH_API_ROOT = 'https://api.github.com/';

var options = {
  url: GH_API_ROOT + 'search/repositories?q=language:javascript&per_page=3', 
  headers: {
    'User-Agent': 'request',
    'Content-type': 'application/json'
  }
};

var pickJSON = {
  gh_id: 'id',
  name: 'name',
  full_name: 'full_name',
  owner: 'owner.login',
  avatar_url: 'owner.avvatar_url',
  url: 'html_url',
  stars: 'stargazers_count',
  watchers: 'watchers_count',
  forks: 'forks',
  language: 'language'
};

function fetchAPI(error, response, body) {
  if(error) { console.log(response) }
  if(!error && response.statusCode === 200) {
    var result = JSON.parse(body);
    var items = filterJSON(result.items, pickJSON);
    updateDb(items, console.log);
  }
}

var requestAPI = request(options, fetchAPI);

exports.module = requestAPI;
