'use strict';

require('node-jsx').install();

var jsdom = require('jsdom');

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


