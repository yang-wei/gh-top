'use strict';

var development = {
  mode: 'development',
  API_ENDPOINT: 'localhost:5000'
}

var production = {
  mode: 'production',
  API_ENDPOINT: 'ghtop-ghstar.rhcloud.com' 
}

module.exports = process.env.NODE_ENV === 'production' ? production : development;
