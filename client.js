'use strict';

var React = require('react');
var Hello = require('./components/hello');
var Repo = require('./components/repo');
var BarChart= require('./components/treemap');

var App = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <link href='./bower_components/fontawesome/css/font-awesome.css' rel='stylesheet' />
        </head>
        <Hello text='React' />
        <BarChart width={600} height={300} text='treemap'/>
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
