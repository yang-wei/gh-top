var filterJSON = require('../filterJSON'),
    expect = require('expect.js')
    ;

describe('filter JSON module', function() {
    
  it('it should on get specified key for an object', function() {
    
    var mockedData = {
      'id': '1',
      'name': 'mock data',
      'source': 'test',
      'purpose': 'test'
    };

    var needed = ['id', 'name'];
    
    expect(filterJSON(mockedData, needed)[0]).to.only.have.keys(needed);

  });

  it('it should get specified key for deep object', function() {

    var mockedData = [
      { 'id': '0', 'name': 'useful data', 'souce': 'who cares', 'purpose': null},
      {'id': '1', 'name': 'mock data', 'source': 'test', 'purpose': 'test' },
      {'id': '2', 'name': 'important data', 'source': 'test', 'purpose': 'nothing' }
    ];
    
    var needed = ['id', 'name'];

    expect(filterJSON(mockedData, needed)[0]).to.only.have.keys(needed);
    expect(filterJSON(mockedData, needed)[1]).to.only.have.keys(needed);
    expect(filterJSON(mockedData, needed)[2]).to.only.have.keys(needed);
  })
});
