'use strict';

var React = require('react');
var ReactAsync = require('react-async');
var Treemap = require('./components/treemap');
var superagent = require('superagent');

var App = React.createClass({
    getInitialState: function() {
      return { repos: [] }
    },

    componentWillMount: function() {
      this.loadRepos();
    },

    componentDidMount: function() {
      //this.loadRepos();
    },

    loadRepos: function() {
      superagent
        .get('http://localhost:5000/api/repos')
        .set({'Access-Control-Allow-Origin': '*'})
        .end(function(err, res) {
          if(err) console.log(err);
          this.setState({ repos: res.body }); 
        }.bind(this));
    },

    render: function() {
      return (
        <html>
          <head>
            <link href='./public/style.css' rel='stylesheet' />
          </head>
          <body>
            <header>
              <h1>Github Repository in Treemap</h1>
              <button onClick={this.loadRepos}>Load Data</button>
            </header>
            <div className='treemap-container'>
              <Treemap data={this.state.repos} value='stars' width={960} height={500} />
            </div>
            <script src='./public/bundle.js'></script>
          </body>
        </html>
      );
    }
  });

module.exports = App;

if (typeof window !== 'undefined') {
  window.onload = function() {
   React.render(<App />, document);
  }
}
