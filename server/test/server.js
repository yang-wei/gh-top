'use strict';
var superagent = require('superagent'),
    app = require('../server'),
    server,
    expect = require('expect.js');

describe('gh-star rest api server', function() {
  
  var ENDPOINT_URI = 'http://localhost:5000';
  before(function(done) {
    server = app.listen(function(err, result) {
      if(err) {
        done(err); 
      } else {
        done(); 
      } 
    })
  }); 

  after(function(done) {
    server.close(done); 
  })

  it('should response', function(done) {
    superagent.get(ENDPOINT_URI)
      .end(function(e, res) {
        expect(e).to.eql(null);
        expect(res.statusCode).to.eql(200);
        done();
      })
  })

  it('should return array of data', function(done) {
    superagent.get(ENDPOINT_URI + '/repos')
      .end(function(e, res) {
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        done();
      })
  })
})
