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
  if(getType(origin) !== 'array') {
    tempArray.push(origin);
    origin = tempArray;
  }
  // change to array - expected single string  example: 'name'
  if(getType(filters) === 'string') {
    filters = slice.call(arguments, 1);
  }

  origin.forEach(function(o) {
    for(var i = 0; i < len; i++) {
      var key= filters[i];
      if(o.hasOwnProperty(key) && typeof o.key !== 'object') {
        newObj[key] = o[key];
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
