'use strict';

var React = require('react');
var Hello = require('./components/hello');
var Repo = require('./components/repo');
var TreeMap = require('./components/treemap');

var App = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <link href='./bower_components/fontawesome/css/font-awesome.css' rel='stylesheet' />
        </head>
        <Hello text='React' />
        <TreeMap text='treemap'/>
      </html>
    );
  }
});

module.exports = App;

if (typeof window !== 'undefined') {
  window.onload = function() {
   React.render(App(), document);
  }
}
