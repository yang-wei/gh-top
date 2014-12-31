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

    var needed = { id: 'id', name: 'name' }; 
    
    expect(filterJSON(mockedData, needed)[0]).to.only.have.keys(['id', 'name']);
    expect(filterJSON(mockedData, needed)[0]).to.eql({ id: '1', name: 'mock data' });

  });

  it('it should get specified key for multiple objects', function() {

    var mockedData = [
      { 'id': '0', 'name': 'useful data', 'souce': 'who cares', 'purpose': null},
      {'id': '1', 'name': 'mock data', 'source': 'test', 'purpose': 'test' },
      {'id': '2', 'name': 'important data', 'source': 'test', 'purpose': 'nothing' }
    ];
    
    var needed = { id: 'id', name: 'name' };

    expect(filterJSON(mockedData, needed)[0]).to.only.have.keys(['id', 'name']);
    expect(filterJSON(mockedData, needed)[0]).to.eql({ id: '0', name: 'useful data' });
    expect(filterJSON(mockedData, needed)[2]).to.only.have.keys(['id', 'name']);
    expect(filterJSON(mockedData, needed)[2]).to.eql({ id: '2', name: 'important data' });
  });

  it('it should get specified key for deep object', function() {

    var mockedData = [
      { 'id': '0', 'user': { 'name': 'User', 'age': '18' }, 'souce': 'who cares', 'purpose': null},
      { 'id': '1', 'user': { 'name': 'User1', 'age': '20' }, 'souce': 'who cares', 'purpose': null},
      { 'id': '2', 'user': { 'name': 'User2', 'age': '29' }, 'souce': 'who cares', 'purpose': null}
    ];
    
    var needed = { id: 'id', name: 'user.name' }; 

    expect(filterJSON(mockedData, needed)[0]).to.only.have.keys(['id', 'name']);
    expect(filterJSON(mockedData, needed)[0]).to.eql({ id: '0', name: 'User' });
    expect(filterJSON(mockedData, needed)[1]).to.only.have.keys(['id', 'name']);
    expect(filterJSON(mockedData, needed)[2]['name']).to.eql('User2');

  })
});
