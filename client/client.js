'use strict';

var React = require('react');
var Treemap = require('./components/treemap');
var LanguageBar = require('./components/languageBar');
var superagent = require('superagent');
var App = React.createClass({
    getInitialState: function(cb) {
      return {
        lang: 'All',
        data: []
      } 
    },
    
    //TODO: use ComponentWillMount, not using because of document reference error 
    componentDidMount: function() {
      this.loadRepos();
    },

    loadRepos: function() {
      superagent
        .get('/api/repos/' + this.state.lang)
        .end(function(err, res) {
          if(err) console.log(err);
            if(res && res.body) {
            this.setState({ data: res.body }); 
          }
        }.bind(this));
    },

    changeLang: function(lang) {
      this.setState({lang: lang}, this.loadRepos);
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
              <Treemap data={this.state.data} value='stars' width={960} height={500} />
            </div>
            <LanguageBar changeLang={this.changeLang} lang={this.state.lang} />
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
