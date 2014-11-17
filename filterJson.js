'use strict';

module.exports = filteredJSON;

/*
 * 
 * @param {Array|Object} origin 
 * @param {Object} pick 
 *
 * @example 
 var obj =  { id: '0', user { 'name': 'Yang', age: '14' } }
 filteredJSON(obj, {id: 'id'}) === '0'
 filteredJSON(obj, {name: 'user.name'}) === 'Yang'
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
    var newObj = {},
        value;
    for(var prop in pick) {
      if(pick.hasOwnProperty(prop)) {

        // split the string into array if it has depth(contains dots)
        var arg = pick[prop].split('.'); 
        newObj[prop] = diveObj(o, arg);      
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

/*
 * A function to get the value of property recursively
 *
 * @param {Object} obj
 * @param {Array} arg 
 * 
 * return value of property
 *
 */
function diveObj(obj, arg) {
  console.log(obj);
  if(arg.length > 0) {
    var prop = arg.shift();
    return diveObj(obj[prop], arg)
  }
  var v = obj;
  return v;
}
