var filterJSON = require('../filterJSON'),
    expect = require('expect.js')
    ;

describe('filter JSON module', function() {
    
  it('it should on get id and name properties', function() {
    
    var mockedData = {
      'id': 1,
      'name': 'mock data',
      'source': 'test',
      'purpose': 'test'
    };

    var needed = ['id', 'name'];

    expect(filterJSON).to.be.a('function');
    expect(filterJSON(mockedData, needed)).to.equal({'id': 1, 'name': 'mock data'});

  });

});
