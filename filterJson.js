'use strict';

module.exports = filteredJSON;

/*
 * typeof obj === 'array'
 * typeof filter === 'array'
 */

function filteredJSON(origin, filters) {
  var slice = Array.prototype.slice,
      len = filters.length,
      tempArray = [],
      newObj = {},
      newArray = [];

  if(origin.length === 0) return newArray; 

  // change to array - expected single object  example: { name: 'Taro', age: '3' }
  if(origin.constructor !== Array) {
    // TODO fixe perfomance
    var originClone = JSON.parse(JSON.stringify(origin));
    origin = [];
    origin.push(originClone);
  }
  // change to array - expected single string  example: 'name'
  if(typeof filters === 'string') {
    filters = slice.call(arguments, 1);
  }

  origin.forEach(function(o) {
    for(var i = 0; i < len; i++) {
      var key= filters[i];

      if(o.hasOwnProperty(key)) {
        newObj[key] = o[key];
      }
    } 
    newArray.push(newObj);
  });
 
    return newArray;
};

