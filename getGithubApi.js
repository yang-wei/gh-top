var request = require('request');
var GH_API_ROOT = 'https://api.github.com/';

var options = {
  url: GH_API_ROOT + 'repos/yang-wei/simplified',
  headers: {
    'User-Agent': 'request',
    'Content-type': 'application/json'
  }
};

function fetchAPI(error, response, body) {
  if(!error && response.statusCode === 200) {
    var result = JSON.parse(body);
    console.log(body);
  }
}

var requestAPI = request(options, fetchAPI);

exports.module = requestAPI;
