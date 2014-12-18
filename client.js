'use strict';

var React = require('react');
var Hello = require('./components/hello');
var Repo = require('./components/repo');
var Treemap = require('./components/treemap');

var App = React.createClass({
    getDefaultProps: function() {
      return { 
        data: [],
        value: ''
      }
    },
    render: function() {
      return (
        <html>
          <head>
            <link href='./bower_components/fontawesome/css/font-awesome.css' rel='stylesheet' />
            <link href='./public/style.css' rel='stylesheet' />
          </head>
          <Hello text='React' />
          <Treemap width={1000} height={600} data={this.props.data} value={this.props.value} />
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
