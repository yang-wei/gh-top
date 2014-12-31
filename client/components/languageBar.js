'use strict';
var React = require('react');
var languages = require('../../server/languages');

module.exports = React.createClass({
  handleChange: function(e) {
    if(e.target && e.target.nodeName === 'A') {
      var lang = encodeURIComponent(e.target.textContent);
      this.props.changeLang(lang);
    }
  },     
  render: function() {
    var options = languages.map(function(lang, i) { 
      return (
        <li key={i} lang={lang.search}><a href='#' >{lang.label}</a></li>
      )
    }.bind(this));
    return (
      <ul className='language-bar' onClick={this.handleChange}>
        {options}
      </ul>
    ) 
  }
});
