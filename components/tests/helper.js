'use strict';

require('node-jsx').install();

var jsdom = require('jsdom');

global.initDOM = function() {
  console.log('Init test dom');
  jsdom.env(
    '<html><body><p>Testing with JSDOM</p></body></html>',
    [],
    function (errors, window) {
      if(errors) { console.log(errors) }

      global.window = window;
      global.document =  window.document;
      global.navigator = window.navigator;
    }
  )
}();

global.cleanDOM = function() {
  console.log("Done testing, cleaning test DOM");
  delete global.window;
  delete global.document;
  delete global.navigator;
}();

