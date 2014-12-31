'use strict';

var superagent = require('superagent'),
    expect = require('expect.js');

describe('make sure github api is working', function() {

  var URL;
  
  before(function() {
    URL = 'https://api.github.com';
  });

  it('should return 200 when request', function(done) {
    superagent.get(URL)
      .set('User-Agent', 'nodejs')
      .set('Content-type', 'application/json')
      .end(function(e, res) {
        expect(e).to.eql(null);
        expect(res.statusCode).to.eql(200);
        done();
      })
  });

});
