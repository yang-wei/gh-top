'use strict';

var React = require('react');
var Hello = require('./components/hello');
var Repo = require('./components/repo');
var Treemap = require('./components/treemap');
var tree = {
    name: "tree",
    children: [
        { name: "Word-wrapping comes for free in HTML", size: 16000 },
        { name: "animate makes things fun", size: 8000 },
        { name: "data data everywhere...", size: 5220 },
        { name: "display something beautiful", size: 3623 },
        { name: "flex your muscles", size: 984 },
        { name: "physics is religion", size: 6410 },
        { name: "query and you get the answer", size: 2124 }
    ]
};


var App = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <link href='./bower_components/fontawesome/css/font-awesome.css' rel='stylesheet' />
        </head>
        <Hello text='React' />
        <Treemap width={700} height={300} data={tree} value='size'/>
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
