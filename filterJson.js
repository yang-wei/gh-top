'use strict';

module.exports = filteredJSON;

/*
 * 
 * @param {Array|Object} origin 
 * @param {Object} pick 
 *      For example: 1 level object { name: 'name', id: 'id' }
 *        or multiple level 'obj' { id: '0', user { 'name': 'Yang', age: '14' } }
 */

function filteredJSON(origin, pick) {

  var newArray = [],
      stackArray = [];

  if(pick === null) return origin;
  
  // change to array - expected single string  example: 'name'
  if(getType(origin) !== 'array') {
    stackArray.push(origin);
    origin = stackArray; 
  }

  origin.forEach(function(o) {
    var newObj = {};
    for(var prop in pick) {
      if(pick.hasOwnProperty(prop)) {
        var value = pick[prop];     
        newObj[prop] = o[value];
      }
    } 
    newArray.push(newObj);
  });
    return newArray;
};

function getType(obj) {
  var types = {
    '[object Array]': 'array',
    '[object Function]': 'function'
  };
  var t = Object.prototype.toString.call(obj);
  if(types.hasOwnProperty(t)) {
    return types[t];
  } 
  return typeof obj;
}

