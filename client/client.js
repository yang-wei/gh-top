'use strict';

var React = require('react');
var Treemap = require('./components/treemap');
var LanguageBar = require('./components/languageBar');
var superagent = require('superagent');
var App = React.createClass({
    getDefaultProps: function() {
      return {
        lang: 'All'
      }
    },

    getInitialState: function(cb) {
      return {
        repos: []
      } 
    },

    componentWillMount: function() {
      // ReferenceError: document is not defined
      //this.loadRepos();
    },

    componentDidMount: function() {
      this.loadRepos();
    },

    loadRepos: function(lang) {
      lang = lang || 'All';
      superagent
        .get('/api/repos/' + lang)
        .end(function(err, res) {
          if(err) console.log(err);
            if(res && res.body) {
            this.setState({ repos: res.body }); 
          }
        }.bind(this));
    },

    changeLang: function(lang) {
      this.loadRepos(lang);
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
            </header>
            <div className='treemap-container'>
              <Treemap data={this.state.repos} value='stars' width={960} height={500} />
            </div>
            <LanguageBar changeLang={this.changeLang} />
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
